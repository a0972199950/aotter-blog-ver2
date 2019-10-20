<template>
    <section>
        <h1 class="page-title">編輯文章</h1>

        <PostForm :post="post" @change="onEditorChange" @fileSelected="fileSelected">
            <div class="row mt-3" slot="actions">
                <div class="col-md-6">
                    <button class="btn btn-primary btn-block" @click="save">儲存</button>
                </div>
                <div class="col-md-6">
                    <button class="btn btn-secondary btn-block" @click="cancel">取消</button>
                </div>
            </div>
        </PostForm>
    </section>
</template>


<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { Context } from "@nuxt/types";
import { IPostClient } from "~/interfaces/basic";
import { IPostDocument } from "../../../server/schemas/Post";

interface IEditorPayload {
    content: IPostClient["content"]
    text: IPostClient["text"]
}

interface IData {
    post: IPostClient | null
    cover: Blob | ""
}

@Component({
    layout: "admin",
    middleware: "auth",
    components: {
        PostForm: () => import("~/components/forms/Post.vue")
    }
})
export default class AdminPosts_postId extends Vue {
    post: IData["post"] = null

    cover: IData["cover"] = ""

    async asyncData(context: Context): Promise<{ post: IData["post"] } | void> {
        const { app, params } = context;
        const postId = params.postId;

        try {
            const { post }: { post: IPostClient } = await app.$axios.$get(`/api/posts/me/${postId}`);
            return { post }
        } catch(e){
            console.log(e);
        }
    }

    onEditorChange(editorPayload: IEditorPayload): void {
        this.post = Object.assign(this.post, editorPayload);
    }

    fileSelected(cover: Blob): void {
        this.cover = cover;
    }

    async save(): Promise<void> {
        const { title, content, text, publish, _id: postId } = this.post!;
        const jsonData = { title, content, text, publish };

        try {
            const { post }: { post: IPostClient } = await this.$axios.$patch(`/api/posts/me/${postId}`, jsonData);
            if(this.cover){
                const result = await this.uploadCover();
                if(!result) throw new Error("圖片上傳失敗");
            }
            this.$swal("修改成功", "", "success");
            this.$router.push("/admin/posts");
        } catch(e){
            console.log(e);
            this.$swal("修改失敗", e, "error");
        }
    }

    async uploadCover(): Promise<boolean> {
        const postId = this.post!._id;
        const formData = new FormData();
        formData.append("cover", this.cover);
        try {
            await this.$axios.$post(`/api/posts/me/${postId}/cover`, formData);
            return true;
        } catch(e) {
            return false;
        }
    }

    cancel(): void {
        this.$swal({
            title: "確定要退出嗎？",
            text: "未完成內容將不會保留",
            icon: "warning"
        }).then((confirm) => {
            if(confirm){
                this.$router.push("/admin/posts");
            }
        });
    }
}
</script>