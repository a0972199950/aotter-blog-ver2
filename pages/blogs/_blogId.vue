<template>
    <section>
        <div 
            class="jumbotron jumbotron-fluid" 
            :style="{'background-image': `linear-gradient( rgba(30, 30, 30, 0.7), rgba(30, 30, 30, 0.7) ), url(${blog.coverUrl})`}">
            <div class="container">
                <h1 class="display-4 font-weight-bold">{{ blog.name }}</h1>
                <p class="lead blog-intro font-weight-bold">{{ blog.intro }}</p>
            </div>
        </div>

        <div class="row px-5">
            <div class="col-md-3">
                <AuthorCard :author="author" />
            </div>

            <div class="col-md-9 border-left">
                <div class="container">
                    <div class="row">
                        <div 
                            v-for="(post, index) in posts"
                            :key="index"
                            class="col-md-6 col-lg-4 mb-3">

                            <nuxt-link :to="`/posts/${post._id}`">
                                <div class="card rounded-0 post">
                                    <div class="card-header p-0">
                                        <img src="https://picsum.photos/300/200">
                                    </div>
                                    <div class="card-body">
                                        <h5 class="card-title">{{ post.title }}</h5>
                                    </div>
                                </div>
                            </nuxt-link>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>

        
    </section>
</template>


<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { Context } from "@nuxt/types";
import { IPostClient, IBlogClient, IAuthor } from "~/interfaces/basic";

interface Data {
    blog: IBlogClient | null
    author: IAuthor | null
    posts: IPostClient[] | []
}

@Component({
    layout: "blog",
    components: {
        AuthorCard: () => import("~/components/UIWidgets/AuthorCard.vue")
    }
})
export default class Blogs_blogId extends Vue {
    blog: Data["blog"] = null
    author: Data["author"] = null
    posts: Data["posts"] = []

    async asyncData(context: Context): Promise<Data | void>{
        const { app, params } = context;
        const blogId: string = params.blogId;

        try {
            const { blog }: { blog: IBlogClient } = await app.$axios.$get(`/api/blogs/${blogId}`);
            const { author }: { author: IAuthor } = await app.$axios.$get(`/api/authors/${blog.author}`);
            const { posts }: { posts: IPostClient[] } = await app.$axios.$get(`/api/posts/blog/${blogId}`);
            return { blog, author, posts };
        } catch(e){
            console.log(e.response);
        }
    }
}
</script>

<style lang="scss" scoped>
.jumbotron {
    height: 400px;
    background-size: cover;
    color: white;

    .blog-intro {
        white-space: pre-line;
    }
}

.post {
    .card-header {
        overflow: hidden;

        img {
            display: block;
            width: 100%;
            transition: all .3s;
        }
    }

    .card-body {
        background: #fafafa;
    }

    &:hover {
        color: #007bff;

        img {
            transform: scale(1.1);
        }
    }
}
</style>