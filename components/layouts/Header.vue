<template>
  <section>
    <b-navbar toggleable="sm" type="dark" variant="primary">
      <b-navbar-brand href="/blogs">Aotter Blog</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown v-if="user" :text="user.email" right>
                <b-dropdown-item :href="`/blogs/${user._id}`">我的部落格</b-dropdown-item>
                <b-dropdown-item href="/admin/blog">設定</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item v-if="!user" href="/">登入</b-nav-item>

            <b-nav-item-dropdown v-if="user" text="登出" right>
                <b-dropdown-item>目前裝置</b-dropdown-item>
                <b-dropdown-item>所有裝置</b-dropdown-item>
            </b-nav-item-dropdown>

        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { IUser } from "~/interfaces/User";

@Component
export default class Header extends Vue {
    get user(): IUser | null {
        return this.$store.state.user;
    }

    async logout(): Promise<void> {
        try {
            await this.$axios.$get("/api/users/logout");
            this.$store.commit("CLEAR_USER");
            this.$router.push("/");
        } catch (e) {
            console.log(e)
        }
    }
}

</script>
