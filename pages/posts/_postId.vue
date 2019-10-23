<template>
    <section>
        <div class="post-container py-3 px-5">
            <h1 class="display-5 font-weight-bold">{{ post.title }}</h1>
            <div class="d-flex">
                <p>{{ post.updatedAt | dateFormatter("YYYY-MM-DD HH:mm") }}</p>
                <span class="ml-3">
                    <font-awesome-icon :icon="['fas', 'eye']" />
                    {{ post.views }}
                </span>
            </div>
            
            <hr>
            <div ref="content"></div>

            <hr class="mt-5">
            <CommentForm @save="createComment" />

            <hr class="mt-5">
            <Comments :comments="comments" />
        </div>
    </section>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { Context } from "@nuxt/types";
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import { IPostClient, ICommentClient } from "~/interfaces/basic";

interface IData {
    post: IPostClient | null
    comments: ICommentClient[]
}

@Component({
    layout: "blog",
    components: {
        Comments: () => import("~/components/Comments.vue"),
        CommentForm: () => import("~/components/forms/CommentForm.vue")
    }
})
export default class Post_postId extends Vue {
    post: IData["post"] = null

    comments: IData["comments"] = []

    get postContentHTML(): string {
        if(!this.post) return "";
        return new QuillDeltaToHtmlConverter(this.post.content).convert();
    }

    async asyncData(context: Context): Promise<IData | void> {
        const { app, params, redirect } = context;
        const postId = params.postId;

        try {
            const { post, comments }: { post: IData["post"], comments: IData["comments"] } = await app.$axios.$get(`/api/posts/${postId}`);
            return { post, comments };
        } catch(e){
            console.log(e);
            redirect("/blogs");
        }
    }

    mounted(): void {
        const contentDiv = this.$refs.content;
        if(contentDiv instanceof Element){
            contentDiv.innerHTML = this.postContentHTML;
        }
    }

    async createComment(text: string): Promise<void> {
        const postId = this.post!._id;

        try {
            await this.$axios.$post(`/api/comments/post/${postId}`, { text });
            this.$router.go(0);
        } catch(e) {
            console.log(e);
            this.$swal.fire("留言失敗", e.response.data.message, "error");
        }
    }
}
</script>


<style lang="scss" scoped>
.post-container {
    max-width: 840px;
    margin: 20px auto 0;
}
</style>