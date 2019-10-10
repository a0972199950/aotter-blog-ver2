<template>
    <section class="container">
        <h3>部落格設定</h3>

        <div class="blogCover">
            <img :src="blogCoverUrl" ref="blogCover">
            <div class="middle">
                <button @click="changeAvatar" class="btn btn-primary rounded-0">變更頭像</button>
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
import { IUser } from "~/interfaces/User";

interface Data {
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
    formData: Data["formData"] = {
        blogName: null,
        blogIntro: null
    }

    asyncData(context: Context): Data{
        const store: Store<IState> = context.store;
        const { blogName, blogIntro } = store.state.user;
        return {
            formData: { blogName, blogIntro }
        }
    }

    changeAvatar(){
        const fileSelector = this.$refs.fileSelector;
        if(fileSelector instanceof HTMLElement){
            fileSelector.click();
        }
    }

    async fileSelected(e: any): Promise<void>{
        const blogCover = e.target.files[0];
        const formData = new FormData();
        const img = this.$refs.blogCover;

        formData.append("blogCover", blogCover);
        try {
            await this.$axios.$post("/api/users/blogCover", formData);

            if(img instanceof HTMLImageElement){
                img.src += `?${new Date().valueOf()}`;
            }
        } catch(e){
            alert("更新失敗");
        }
        
    }

    async save(): Promise<void>{
        const updates = this.formData;

        try {
            const { user }: { user: IUser } = await this.$axios.$patch(`/api/users/profile`, updates);
            this.$store.commit("SET_USER", user);
            alert("更新完成");
        } catch(e){
            console.log(e.response);
        }
    }
}
</script>


<style lang="scss" scoped>
.blogCover {
    width: 100%;
    height: 400px;
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