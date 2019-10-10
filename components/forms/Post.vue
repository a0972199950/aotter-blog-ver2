<template>
    <section>
        <div class="form-group">
            <label for="image">封面照片</label>
            <input type="file" id="image" class="form-control">
        </div>

        <div class="form-group">
            <label for="title">標題</label>
            <input type="text" id="title" class="form-control" v-model="post.title">
        </div>

        <div class="form-group">
            <label for="content">內文</label>
            <textarea id="content" rows="10" class="form-control" v-model="post.content"></textarea>
        </div>

        <slot name="actions"></slot>
    </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import { IPost } from "~/server/schemas/Post";


@Component
export default class FormsPost extends Vue{
    @Prop(Object) 
    readonly post: IPost | undefined
}
</script>