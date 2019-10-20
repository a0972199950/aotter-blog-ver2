<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { Context } from "@nuxt/types";

@Component
export default class Index extends Vue {
    async asyncData(context: Context): Promise<void> {
        const { redirect } = context;
        redirect("/blogs");
    }
}
</script>