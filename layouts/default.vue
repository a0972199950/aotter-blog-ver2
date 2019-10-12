<template>
    <section id="layout">
        <div id="bg"></div>
        <Header />
        <nuxt />
    </section>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";


declare namespace particlesJS {
    var load: (id: string, jsonSorece: string) => void
}

@Component({
    components: {
        Header: () => import("~/components/layouts/Header.vue")
    }
})
export default class AdminLayout extends Vue{
    async mounted(){
        // https://github.com/VincentGarreau/particles.js/
        await import("particles.js");
        particlesJS.load('bg', 'api/config');
    }
}
</script>

<style lang="scss" scoped>
#layout {
    padding-top: 56px;
}

#bg {
    position: fixed;
    z-index: -1;
    width: 100vw;
    min-height: 100vh;
    background: linear-gradient( rgba(30, 30, 30, 0.6), rgba(30, 30, 30, 0.6) ), url("/api/static/image/blogCover-default.jpg");
    background-size: cover;
    background-position: center center;
}
</style>
