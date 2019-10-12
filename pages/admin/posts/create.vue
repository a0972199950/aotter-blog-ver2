<template>
    <section>
        <PostForm :post="post" @change="onEditorChange">
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
import { IPostClient } from "~/interfaces/basic";

interface Data {
    title: IPostClient["title"] | null
    content: IPostClient["content"] | null
}

@Component({
    layout: "admin",
    middleware: "auth",
    components: {
        PostForm: () => import("~/components/forms/Post.vue")
    }
})
export default class AdminPostsCreate extends Vue {
    post: Data = {
        title: null,
        content: null
    }

    onEditorChange(deltaOps: IPostClient["content"]){
        this.post.content = deltaOps;
    }

    async save(): Promise<void>{
        const post: Data = this.post;

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