<template>
    <section>
        <div v-if="!blog" class="d-flex justify-content-center align-items-center">
            <h1>部落格不存在或未公開</h1>
        </div>

        <template v-if="blog">
            <div 
                class="jumbotron jumbotron-fluid" 
                :style="{'background-image': `linear-gradient( rgba(30, 30, 30, 0.7), rgba(30, 30, 30, 0.7) ), url(${blog.coverUrl})`}">
                <div class="container">
                    <h1 class="display-4 font-weight-bold">{{ blog.name }}</h1>
                    <p class="lead blog-intro font-weight-bold">{{ blog.intro }}</p>
                </div>
            </div>

            <div class="container">
                <div class="row">
                    <div class="col-md-9 border-right order-2 order-md-1">
                        <div class="container">
                            <div class="row">
                                <div 
                                    v-for="(post, index) in posts"
                                    :key="index"
                                    class="col-md-6 col-xl-4 mb-3">

                                    <nuxt-link :to="`/posts/${post._id}`">
                                        <div class="card rounded-0 post">
                                            <div class="card-header p-0">
                                                <img :src="post.coverUrl">
                                            </div>
                                            <div class="card-body pb-2">
                                                <h5 class="card-title mb-3">{{ post.title }}</h5>

                                                <div class="d-flex justify-content-between">
                                                    <p class="m-0">{{ post.updatedAt | dateFormatter("YYYY-MM-DD HH:mm") }}</p>
                                                    <p class="m-0">
                                                        <font-awesome-icon :icon="['fas', 'eye']" />
                                                        {{ post.views }}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </nuxt-link>
                                    
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-3 order-1 order-md-2">
                        <AuthorCard :blog="blog" />
                    </div>
                </div>
            </div>
        </template>
    </section>
</template>


<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { Context } from "@nuxt/types";
import { IPostClient, IBlogClient } from "~/interfaces/basic";

interface IData {
    blog: IBlogClient | null
    posts: IPostClient[] | []
}

@Component({
    layout: "blog",
    components: {
        AuthorCard: () => import("~/components/AuthorCard.vue")
    }
})
export default class Blogs_blogId extends Vue {
    blog: IData["blog"] = null
    posts: IData["posts"] = []

    async asyncData(context: Context): Promise<IData | void> {
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
    height: 400px;
    background-size: cover;
    background-position: center center;
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