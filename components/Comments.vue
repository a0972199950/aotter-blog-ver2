<template>
    <section>
        <h3 class="font-weight-bold">留言</h3>
        <div v-for="(comment, index) in comments" :key="index" class="media mb-4">
            <img :src="comment.avatarUrl" class="mr-3">
            <div class="media-body">
                <h5 class="mt-0 font-weight-bold">
                    {{ comment.name || "匿名" }}
                    <small class="text-secondary">{{ comment.createdAt | dateFormatter("YYYY-MM-DD HH:mm") }}</small>
                </h5>
                {{ comment.text }}
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import { ICommentClient } from "../interfaces/basic";

interface IProp {
    comments: ICommentClient[]
}

@Component
export default class Comments extends Vue {
    @Prop({ type: Array, default: [] })
    readonly comments!: IProp["comments"]
}
</script>

<style lang="scss" scoped>
.media {
    img {
        width: 64px;
        height: 64px;
    }

    .media-body {
        word-break: break-all;
    }
}
</style>