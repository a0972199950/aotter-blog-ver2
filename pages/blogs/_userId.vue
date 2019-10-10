<template>
    <section>
        <div class="jumbotron jumbotron-fluid">
            <div class="container">
                <h1 class="display-4">{{ author.blogName }}</h1>
                <p class="lead">{{ author.blogIntro }}</p>
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
import { IPosts } from "~/interfaces/Post";
import { IAuthor } from "~/interfaces/User"

interface Data {
    posts: IPosts | never[],
    author: IAuthor
}

@Component
export default class Blogs_userId extends Vue {
    posts: Data["posts"] = []
    author: Data["author"] = {
        _id: null,
        blogName: null,
        blogIntro: null,
        avatarUrl: null
    }

    async asyncData(context: Context): Promise<Data | void>{
        const { app, params } = context;
        const userId = params.userId;

        try {
            const { author }: { author: IAuthor } = await app.$axios.$get(`/api/users/${userId}`);
            const { posts }: { posts: IPosts } = await app.$axios.$get(`/api/posts/all/${userId}`);
            return { posts, author };
        } catch(e){
            console.log(e.response);
        }
    }
}
</script>

<style lang="scss" scoped>
.jumbotron {
    background-image: url("https://picsum.photos/1200/500");
    background-size: contain;
    color: white;
}
</style>