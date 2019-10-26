<template>
    <section class="container mt-3">
        <div class="row">
            <div v-for="(blog, index) in blogs" :key="index" class="col-md-4">
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

        console.log("asyncData MONGOOSE_DATABASE_URL: " + process.env.MONGOOSE_DATABASE_URL);
        console.log("asyncData COOKIE_SIGN_KEY: " + process.env.COOKIE_SIGN_KEY);
        console.log("asyncData JWT_SECRET_KEY: " + process.env.JWT_SECRET_KEY);
        console.log("asyncData axios defaults: ", app.$axios.defaults);

        try {
            let { blogs }: { blogs: IBlogClient[] } = await app.$axios.$get("/api/blogs");
            return { blogs }
        } catch(e){
            console.log(e.response);
        }
    }
}
</script>
