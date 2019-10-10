<template>
    <section>
        <div class="list-group">
            <nuxt-link
                to="/admin/profile"
                class="list-group-item list-group-item-action"
                :class="{ active: $route.path.match(/^\/admin\/profile/) }">
                會員資料
            </nuxt-link>

            <nuxt-link
                to="/admin/blog"
                class="list-group-item list-group-item-action"
                :class="{ active: $route.path.match(/^\/admin\/blog/) }">
                部落格設定
            </nuxt-link>

            <nuxt-link
                to="/admin/posts"
                class="list-group-item list-group-item-action"
                :class="{ active: $route.path.match(/^\/admin\/posts/) }">
                文章編輯
            </nuxt-link>
        </div>
    </section>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component
export default class Sidebar extends Vue{}
</script>