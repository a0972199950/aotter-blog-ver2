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
        </div>
    </section>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { Context } from "@nuxt/types";
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import { IPostClient } from "~/interfaces/basic";

interface Data {
    post: IPostClient | null
}

@Component({
    layout: "blog"
})
export default class Post_postId extends Vue {
    post: Data["post"] = null;

    get postContentHTML(): string{
        if(!this.post) return "";
        return new QuillDeltaToHtmlConverter(this.post.content).convert();
    }

    async asyncData(context: Context): Promise<Data | void>{
        const { app, params, redirect } = context;
        const postId = params.postId;
        console.log(postId);

        try {
            const { post }: { post: Data["post"] } = await app.$axios.$get(`/api/posts/${postId}`);
            if(!post) return redirect("/blogs");

            return { post };
        } catch(e){
            console.log(e);
        }
    }

    mounted(){
        const contentDiv = this.$refs.content;
        if(contentDiv instanceof Element){
            contentDiv.innerHTML = this.postContentHTML;
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