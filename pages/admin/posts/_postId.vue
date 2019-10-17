<template>
    <section>
        <PostForm :post="post" @change="onEditorChange">
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

interface IEditorPayload {
    content: IPostClient["content"]
    text: IPostClient["text"]
}

interface Data {
    post: IPostClient | null
}

@Component({
    layout: "admin",
    middleware: "auth",
    components: {
        PostForm: () => import("~/components/forms/Post.vue")
    }
})
export default class AdminPosts_postId extends Vue {
    post: Data["post"] = null

    async asyncData(context: Context): Promise<Data | void> {
        const { app, params } = context;
        const postId = params.postId;

        try {
            const { post }: { post: IPostClient } = await app.$axios.$get(`/api/posts/${postId}`);
            console.log(post);
            return { post }
        } catch(e){
            console.log(e);
        }
    }

    onEditorChange(editorPayload: IEditorPayload){
        this.post = Object.assign(this.post, editorPayload);
    }

    async save(): Promise<void> {
        if(!this.post) return;
        const { title, content, text, publish, _id: postId } = this.post;
        const updates = { title, content, text, publish };

        try {
            await this.$axios.patch(`/api/posts/${postId}`, updates);
            this.$router.push("/admin/posts");
        } catch(e){
            console.log(e);
            this.$swal("儲存失敗", "請查看console", "error");
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