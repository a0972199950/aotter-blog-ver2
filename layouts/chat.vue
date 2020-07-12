<template>
    <section id="layout">
        <Header />

        <div class="row p-0 m-0">
            <div class="col-3 border-right p-0">
                <ChatRooms />
            </div>
            <nuxt />
        </div>
        
    </section>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component({
    components: {
        Header: () => import("~/components/layouts/Header.vue"),
        ChatRooms: () => import("~/components/layouts/ChatRooms.vue")
    }
})
export default class AdminLayout extends Vue{}
</script>

<style lang="scss" scoped>
#layout {
    padding-top: 56px;
}
</style>
    