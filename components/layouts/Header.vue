<template>
    <nav class="navbar navbar-expand-sm navbar-light bg-light">
        <nuxt-link :to="'/'" class="navbar-brand">Aotter Blog</nuxt-link>

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item active">
                    <nuxt-link :to="'/admin/profile'" class="nav-link">{{ email }}</nuxt-link>
                </li>
                <li class="nav-item">
                    <nuxt-link :to="'/admin/posts'" class="nav-link">我的部落格</nuxt-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component
export default class Header extends Vue {
    get email(): string | null{
        return this.$store.state.user.email;
    }
}
</script>