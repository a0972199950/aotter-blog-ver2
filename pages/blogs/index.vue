<template>
    <section class="container mt-3">
        <div class="row">
            <div v-for="(author, index) in authors" :key="index" class="col-md-4">
                <AuthorCard :author="author" />
            </div>
        </div>
    </section>
</template>


<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { Context } from "@nuxt/types";
import { IAuthor } from "~/interfaces/basic";

interface IData {
    authors: IAuthor[]
}

@Component({
    components: {
        AuthorCard: () => import("~/components/AuthorCard.vue")
    }
})
export default class Blogs extends Vue {
    authors: IData["authors"] = []

    async asyncData(context: Context): Promise<IData | void> {
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
