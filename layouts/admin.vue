<template>
    <section id="layout">
        <Header />

        <div class="container">
            <div class="row">
                <Sidebar class="col-md-3" />
                <nuxt class="col-md-9" />
            </div>
        </div>
        
    </section>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component({
    components: {
        Header: () => import("~/components/layouts/Header.vue"),
        Sidebar: () => import("~/components/layouts/Sidebar.vue")
    }
})
export default class AdminLayout extends Vue{}
</script>

<style lang="scss" scoped>
#layout {
    padding-top: 70px;
}
</style>
    