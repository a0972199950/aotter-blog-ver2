<template>
    <section>
        <ImageInputer 
            title="封面圖片"
            width="300px"
            height="200px"
            :imageUrl="post.coverUrl"
            @fileSelected="fileSelected" />

        <div class="form-group">
            <label for="title">標題</label>
            <input type="text" id="title" class="form-control" v-model="post.title">
        </div>

        <label for="content">內文</label>
        <Editor 
            :delta="post.content"
            @change="onEditorChange" />

        <div class="form-group-inline mt-3 mb-4">
            <label class="mr-3 mb-0">是否公開？</label>

            <div class="custom-control custom-radio custom-control-inline">
                <input type="radio" id="publish-1" class="custom-control-input" name="publish" v-model="post.publish" :value="true">
                <label class="custom-control-label" for="publish-1">公開</label>
            </div>
            <div class="custom-control custom-radio custom-control-inline">
                <input type="radio" id="publish-2" class="custom-control-input" name="publish" v-model="post.publish" :value="false">
                <label class="custom-control-label" for="publish-2">隱藏</label>
            </div>
        </div>

        <slot name="actions"></slot>
    </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import { IPostClient } from "~/interfaces/basic";

interface IProp {
    post: IPostClient | null
}

interface IEditorPayload {
    content: IPostClient["content"]
    text: IPostClient["text"]
}

@Component({
    components: {
        ImageInputer: () => import("~/components/UIWidgets/ImageInputer.vue"),
        Editor: () => import("~/components/UIWidgets/Editor.vue")
    }
})
export default class FormsPost extends Vue{
    @Prop({ type: Object, default: null }) 
    readonly post!: IProp["post"]

    onEditorChange(editorPayload: IEditorPayload): void {
        this.$emit("change", editorPayload);
    }

    fileSelected(image: Blob): void {
        this.$emit("fileSelected", image);
    }
}
</script>

<style lang="scss" scoped>
.cover {
    width: 300px;
    height: 200px;
    position: relative;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .middle {
        transition: .5s ease;
        opacity: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%)
    }

    &:hover {
        img {
            opacity: 0.3;
        }

        .middle {
            opacity: 1;
        }
    }
}
</style>