<template>
    <section>
        <PostForm :post="post">
            <div class="row" slot="actions">
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

interface Post{
    _id: string | null,
    title: string | null,
    content: string | null
}

interface Data{
    post: Post
}

@Component({
    layout: "admin",
    middleware: "auth",
    components: {
        PostForm: () => import("~/components/forms/Post.vue")
    }
})
export default class AdminPosts_postId extends Vue {
    post: Post = {
        _id: null,
        title: null,
        content: null
    }

    async asyncData(context: Context): Promise<Data | void>{
        const { app, params } = context;
        const postId = params.postId;

        try {
            const { post } = await app.$axios.$get(`/api/posts/${postId}`);
            return { post }
        } catch(e){
            console.log(e);
        }
    }

    async save(): Promise<void>{
        const postId = this.post._id;
        const updates = {
            title: this.post.title,
            content: this.post.content
        }

        try {
            await this.$axios.patch(`/api/posts/${postId}`, updates);
            this.$router.push("/admin/posts");
        } catch(e){
            console.log(e);
            this.$swal("儲存失敗", "請查看console", "error");
        }
    }

    cancel(): void{
        if(confirm("確定要離開嗎？所做的變更將不會被儲存")){
            this.$router.push("/admin/posts");
        }
    }
}
</script>