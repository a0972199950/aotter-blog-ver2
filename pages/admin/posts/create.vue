<template>
    <section>
        <PostForm :post="post">
            <div class="row" slot="actions">
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

interface Post {
    title: string | null,
    content: string | null
}

@Component({
    layout: "admin",
    components: {
        PostForm: () => import("~/components/forms/Post.vue")
    }
})
export default class AdminPostsCreate extends Vue {
    post: Post = {
        title: null,
        content: null
    }

    async save(): Promise<void>{
        const post: Post = this.post;

        try {
            await this.$axios.$post("/api/posts", post);
            this.$router.push("/admin/posts");
        } catch(e){
            console.log(e);
            alert("新增失敗，請查看console");
        }
    }

    cancel(): void{
        if(confirm("確定要離開嗎？所做的變更將不會被儲存")){
            this.$router.go(-1);
        }
    }
}
</script>