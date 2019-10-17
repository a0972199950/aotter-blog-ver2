<template>
    <section>
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

interface IEditorPayload {
    content: IPostClient["content"]
    text: IPostClient["text"]
}

@Component({
    components: {
        Editor: () => import("~/components/UIWidgets/Editor.vue")
    }
})
export default class FormsPost extends Vue{
    @Prop(Object) 
    readonly post: IPostClient | undefined

    onEditorChange(editorPayload: IEditorPayload){
        this.$emit("change", editorPayload);
    }
}
</script>