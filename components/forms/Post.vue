<template>
    <section>
        <div class="form-group">
            <label for="title">標題</label>
            <input type="text" id="title" class="form-control" v-model="post.title">
        </div>

        <Editor 
            :delta="post.content"
            @change="onEditorChange" />

        <slot name="actions"></slot>
    </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import { IPostClient } from "~/interfaces/basic";


@Component({
    components: {
        Editor: () => import("~/components/UIWidgets/Editor.vue")
    }
})
export default class FormsPost extends Vue{
    @Prop(Object) 
    readonly post: IPostClient | undefined

    onEditorChange(deltaOps: IPostClient["content"]){
        this.$emit("change", deltaOps);
    }
}
</script>