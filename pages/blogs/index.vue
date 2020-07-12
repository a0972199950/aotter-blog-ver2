<template>
    <section class="container mt-5 pt-5">
        <div class="row">
            <div v-for="(blog, index) in blogs" :key="index" class="col-md-3 d-flex author-card-container">
                <AuthorCard :blog="blog" />
            </div>
        </div>
    </section>
</template>


<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { Context } from "@nuxt/types";
import { IBlogClient } from "~/interfaces/basic";

interface IData {
    blogs: IBlogClient[]
}

@Component({
    components: {
        AuthorCard: () => import("~/components/AuthorCard.vue")
    }
})
export default class Blogs extends Vue {
    blogs: IData["blogs"] = []

    async asyncData(context: Context): Promise<IData | void> {
        const { app } = context;

        try {
            let { blogs }: { blogs: IBlogClient[] } = await app.$axios.$get("/api/blogs");
            return { blogs }
        } catch(e){
            console.log(e.response);
        }
    }
}
</script>

<style lang="scss" scoped>
.author-card-container {
    margin-bottom: 4rem;
}
</style>
