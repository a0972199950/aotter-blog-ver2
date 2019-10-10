<template>
    <section>
        <Header />
        <nuxt />
    </section>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component({
    components: {
        Header: () => import("~/components/layouts/Header.vue")
    }
})
export default class AdminLayout extends Vue{}
</script>
