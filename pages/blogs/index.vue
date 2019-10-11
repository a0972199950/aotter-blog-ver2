<template>
    <section class="container pt-5 mt-5">
        <div class="row">
            <div v-for="(author, index) in authors" :key="index" class="col-md-4">
                <nuxt-link :to="`/blogs/${author._id}`">
                    <div class="card text-center mb-5 mt-5 mb-md-0">
                        <img 
                            class="img-fluid w-50 mx-auto border rounded-circle mt-n5" 
                            :src="author.avatarUrl">

                        <div class="card-body pb-0">
                            <h3>{{ author.blogName }}</h3>
                            <h5 class="name">Lead Writer</h5>
                            <p>{{ author.blogIntro }}</p>
                        </div>

                        <div class="d-flex justify-content-center">
                            <div class="p-3">
                                <a href="#">
                                    <i class="fab fa-facebook fa-2x"></i>
                                </a>
                            </div>

                            <div class="p-3">
                                <a href="#">
                                    <i class="fab fa-twitter fa-2x"></i>
                                </a>
                            </div>

                            <div class="p-3">
                                <a href="#">
                                    <i class="fab fa-instagram fa-2x"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </nuxt-link>
            </div>
        </div>
    </section>
</template>


<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { Context } from "@nuxt/types";
import { IAuthor } from "~/interfaces/basic";

interface Data {
    authors: IAuthor[]
}

@Component
export default class Blogs extends Vue {
    authors: Data["authors"] = []

    async asyncData(context: Context): Promise<Data | void>{
        const { app } = context;

        try {
            let { authors }: { authors: IAuthor[] } = await app.$axios.$get("/api/authors");
            return { authors }
        } catch(e){
            console.log(e.response);
        }
    }
}
</script>

<style lang="scss" scoped>
a {
    text-decoration: none;
    color: inherit;
}

.name {
    color: #6c757d;
}

.card:hover {
    background: darken($color: #007bff, $amount: 10);
    color: white;

    .name {
        color: white;
    }
}
</style>