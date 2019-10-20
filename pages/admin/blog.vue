<template>
    <section>
        <h1 class="page-title">部落格設定</h1>

        <ImageInputer 
            title="封面圖片"
            width="100%"
            height="300px"
            :imageUrl="blogCoverUrl"
            @fileSelected="fileSelected" />

        <div class="form-group">
            <label for="blogName">部落格名稱</label>
            <input 
                type="text" 
                id="blogName" 
                v-model="formData.blogName" 
                class="form-control"
                :class="{ 'is-invalid': $v.formData.blogName.$error }"
                @blur="$v.formData.blogName.$touch()">
            <small class="invalid-feedback">部落格名稱必填</small>
        </div>

        <div class="form-group">
            <label for="blogIntro">部落格簡介</label>
            <textarea v-model="formData.blogIntro" class="form-control" id="blogIntro" cols="30" rows="4"></textarea>
        </div>

        <div class="form-group-inline mt-3 mb-4">
            <label class="mr-3 mb-0">是否公開？</label>

            <div class="custom-control custom-radio custom-control-inline">
                <input type="radio" id="publish-1" class="custom-control-input" name="publish" v-model="formData.blogPublish" :value="true">
                <label class="custom-control-label" for="publish-1">公開</label>
            </div>
            <div class="custom-control custom-radio custom-control-inline">
                <input type="radio" id="publish-2" class="custom-control-input" name="publish" v-model="formData.blogPublish" :value="false">
                <label class="custom-control-label" for="publish-2">隱藏</label>
            </div>
        </div>

        <button class="btn btn-primary btn-block" @click="save">儲存</button>
        
    </section>
</template>


<script lang="ts">
import { Component, Vue, mixins } from 'nuxt-property-decorator';
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { Context } from "@nuxt/types";
import { Store } from "vuex";
import { IState } from "~/store/index";
import { IUserClient, IBlogClient } from "~/interfaces/basic";

interface IData {
    blogCoverUrl: string | null
    formData: {
        blogName: string | null
        blogIntro: string | null
        blogPublish: boolean
    }
}

@Component({
    middleware: "auth",

    layout: "admin",

    components: {
        ImageInputer: () => import("~/components/UIWidgets/ImageInputer.vue"),
    },

    validations: {
		formData: {
			blogName: { required }
		}
	}
})
export default class AdminBlog extends mixins(validationMixin) {
    blogCoverUrl: IData["blogCoverUrl"] = null
    formData: IData["formData"] = {
        blogName: null,
        blogIntro: null,
        blogPublish: false
    }

    asyncData(context: Context): IData | void {
        const store: Store<IState> = context.store;
        const blog = store.state.blog;

        if(blog){
            const { coverUrl, name, intro, publish } = blog;
            return {
                blogCoverUrl: coverUrl,
                formData: { 
                    blogName: name, 
                    blogIntro: intro,
                    blogPublish: publish
                }
            }
        }
    }

    async fileSelected(blogCover: Blob): Promise<void> {
        const formData = new FormData();
        formData.append("cover", blogCover);

        try {
            const { blog } = await this.$axios.$post("/api/blogs/me/cover", formData);
            this.$store.commit("SET_BLOG", blog);

            this.$swal("更新成功", "", "success");
        } catch(e){
            console.log(e.response);
            this.$swal("更新失敗", "", "error");
        }
        
    }

    async save(): Promise<void> {
        if(this.formInvalid()) return;

        const updates = this.formData;

        try {
            const { blog }: { blog: IBlogClient } = await this.$axios.$patch(`/api/blogs/me`, updates);
            this.$store.commit("SET_BLOG", blog);
            this.$swal("更新成功", "", "success");
        } catch(e){
            console.log(e.response);
            this.$swal("更新失敗", "", "error");
        }
    }

    formInvalid(): boolean {
		this.$v.$touch();
		return this.$v.$invalid;
	}
}
</script>


<style lang="scss" scoped>
.blogCover {
    width: 100%;
    height: 300px;
    position: relative;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .middle {
        transition: .5s ease;
        opacity: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%)
    }

    &:hover {
        img {
            opacity: 0.3;
        }

        .middle {
            opacity: 1;
        }
    }
}
</style>