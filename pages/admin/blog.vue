<template>
    <section class="container">
        <h3>部落格設定</h3>

        <div class="blogCover">
            <img :src="blogCoverUrl" ref="blogCover">
            <div class="middle">
                <button @click="changeBlogCover" class="btn btn-primary rounded-0">變更封面</button>
                <input type="file" ref="fileSelector" @change="fileSelected" style="display: none">
            </div>
        </div>

        <div class="form-group">
            <label for="blogName">部落格名稱</label>
            <input type="text" id="blogName" v-model="formData.blogName" class="form-control">
        </div>

        <div class="form-group">
            <label for="blogIntro">部落格簡介</label>
            <input type="text" id="blogIntro" v-model="formData.blogIntro" class="form-control">
        </div>

        <button class="btn btn-primary btn-block" @click="save">儲存</button>
        
    </section>
</template>


<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { Context } from "@nuxt/types";
import { Store } from "vuex";
import { IState } from "~/store/index";
import { IUserClient, IBlogClient } from "~/interfaces/basic";

interface Data {
    blogCoverUrl: string | null
    formData: {
        blogName: string | null,
        blogIntro: string | null
    }
}

@Component({
    middleware: "auth",
    layout: "admin"
})
export default class AdminBlog extends Vue {
    blogCoverUrl: Data["blogCoverUrl"] = null
    formData: Data["formData"] = {
        blogName: null,
        blogIntro: null
    }

    asyncData(context: Context): Data | void{
        const store: Store<IState> = context.store;
        const blog = store.state.blog;

        if(blog){
            const { coverUrl, name, intro } = blog;
            return {
                blogCoverUrl: coverUrl,
                formData: { 
                    blogName: name, 
                    blogIntro: intro
                }
            }
        }
    }

    changeBlogCover(){
        const fileSelector = this.$refs.fileSelector;
        if(fileSelector instanceof HTMLElement){
            fileSelector.click();
        }
    }

    async fileSelected(e: any): Promise<void>{
        const blogCover = e.target.files[0];
        const formData = new FormData();
        const img = this.$refs.blogCover;

        formData.append("cover", blogCover);
        try {
            const { blog } = await this.$axios.$post("/api/blogs/cover", formData);
            this.$store.commit("SET_BLOG", blog);

            if(img instanceof HTMLImageElement){
                img.src = blog.coverUrl;
                this.$swal("更新成功", "", "success");
            }
        } catch(e){
            console.log(e.response);
            this.$swal("更新失敗", "", "error");
        }
        
    }

    async save(): Promise<void>{
        const updates = this.formData;

        try {
            const { blog }: { blog: IBlogClient } = await this.$axios.$patch(`/api/blogs`, updates);
            this.$store.commit("SET_BLOG", blog);
            this.$swal("更新成功", "", "success");
        } catch(e){
            console.log(e.response);
            this.$swal("更新失敗", "", "error");
        }
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