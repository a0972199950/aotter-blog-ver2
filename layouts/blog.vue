<template>
    <section id="layout">
        <div id="bg"></div>
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

<style lang="scss" scoped>
#layout {
    padding-top: 56px;
}
</style>
