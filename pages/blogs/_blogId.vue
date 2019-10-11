<template>
    <section>
        <div class="jumbotron jumbotron-fluid" :style="{'background-image': `url(${blog.coverUrl})`}">
            <div class="container">
                <h1 class="display-4">{{ blog.name }}</h1>
                <p class="lead">{{ blog.intro }}</p>
            </div>
        </div>

        <div class="container">
            <div 
                v-for="(post, index) in posts"
                :key="index"
                class="media border rounded mb-2">

                <img src="https://picsum.photos/100/100" class="mr-3" alt="...">
                <div class="media-body">
                    <h5 class="mt-0">{{ post.title }}</h5>
                    {{ post.content }}
                </div>
            </div>
        </div>
    </section>
</template>


<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { Context } from "@nuxt/types";
import { IPostClient, IBlogClient } from "~/interfaces/basic";

interface Data {
    blog: IBlogClient | null
    posts: IPostClient[] | []
}

@Component
export default class Blogs_blogId extends Vue {
    blog: Data["blog"] = null
    posts: Data["posts"] = []

    async asyncData(context: Context): Promise<Data | void>{
        const { app, params } = context;
        const blogId: string = params.blogId;

        try {
            const { blog }: { blog: IBlogClient } = await app.$axios.$get(`/api/blogs/${blogId}`);
            const { posts }: { posts: IPostClient[] } = await app.$axios.$get(`/api/posts/blog/${blogId}`);
            return { blog, posts };
        } catch(e){
            console.log(e.response);
        }
    }
}
</script>

<style lang="scss" scoped>
.jumbotron {
    height: 350px;
    background-size: cover;
    color: white;
}
</style>