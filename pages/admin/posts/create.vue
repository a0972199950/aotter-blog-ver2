<template>
    <section>
        <PostForm :post="post" @change="onEditorChange">
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
import { IPostClient } from "~/interfaces/basic";

interface IEditorPayload {
    content: IPostClient["content"]
    text: IPostClient["text"]
}

interface IData {
    title: IPostClient["title"] | null
    content: IPostClient["content"] | null
    text: IPostClient["text"] | null
    publish: IPostClient["publish"]
}

@Component({
    layout: "admin",
    middleware: "auth",
    components: {
        PostForm: () => import("~/components/forms/Post.vue")
    }
})
export default class AdminPostsCreate extends Vue {
    post: IData = {
        title: null,
        content: null,
        text: null,
        publish: false
    }

    onEditorChange(editorPayload: IEditorPayload){
        this.post = Object.assign(this.post, editorPayload);
    }

    async save(): Promise<void>{
        const post: IData = this.post;

        try {
            await this.$axios.$post("/api/posts", post);
            this.$router.push("/admin/posts");
        } catch(e){
            console.log(e);
            alert("新增失敗，請查看console");
        }
    }

    cancel(): void{
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