<template>
    <section>
        <h1 class="page-title">新增文章</h1>

        <PostForm :post="post" @change="onEditorChange" @fileSelected="fileSelected">
            <div class="row mt-3" slot="actions">
                <div class="col-md-6">
                    <button class="btn btn-primary btn-block" @click="save">新增文章</button>
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
import { IPostClient, IPost } from "~/interfaces/basic";

interface IEditorPayload {
    content: IPostClient["content"]
    text: IPostClient["text"]
}

interface IData {
    post: {
        title: IPostClient["title"] | null
        content: IPostClient["content"] | null
        text: IPostClient["text"] | null
        publish: IPostClient["publish"]
    }
    cover: Blob | ""
}

@Component({
    layout: "admin",
    middleware: "auth",
    components: {
        PostForm: () => import("~/components/forms/Post.vue")
    }
})
export default class AdminPostsCreate extends Vue {
    post: IData["post"] = {
        title: null,
        content: null,
        text: null,
        publish: false
    }

    cover: IData["cover"] = ""

    onEditorChange(editorPayload: IEditorPayload): void {
        this.post = Object.assign(this.post, editorPayload);
    }

    fileSelected(cover: Blob): void {
        this.cover = cover;
    }

    async save(): Promise<void> {
        const jsonData = this.post;

        try {
            const { post }: { post: IPostClient } = await this.$axios.$post("/api/posts/me", jsonData);
            
            const postId = post._id;
            if(this.cover){
                const result = await this.uploadCover(postId);
                if(!result) throw new Error("圖片上傳失敗");
            }
            
            this.$swal("新增成功", "", "success");
            this.$router.push("/admin/posts");
        } catch(e){
            console.log(e);
            this.$swal("新增失敗", e.response.data.message, "error");
        }
    }

    async uploadCover(postId: string): Promise<boolean> {
        const cover = this.cover;
        const formData = new FormData();
        formData.append("cover", cover);

        try {
            await this.$axios.$post(`/api/posts/me/${postId}/cover`, formData);
            return true;
        } catch(e){
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
        })
    }
}
</script>