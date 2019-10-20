<template>
    <quill-editor 
        v-model="html"
        ref="quillEditor"
        :options="editorOption"
        @ready="onEditorReady($event)"
        @change="onEditorChange($event)" />
</template>


<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import { QuillOptionsStatic, Quill, DeltaOperation } from "quill";

interface IQuillChangeArg {
    html: string
    quill: Quill
    text: string
}

@Component
export default class UIWidgetsEditor extends Vue {
    @Prop({ type: Array, default: [] })
    readonly delta: any

    html: string | null = null

    editorOption: QuillOptionsStatic = {
        theme: "snow",
        modules: {
            toolbar: [
                ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                ['blockquote', 'code-block'],

                [{ 'header': 1 }, { 'header': 2 }],               // custom button values
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                [{ 'direction': 'rtl' }],                         // text direction

                [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

                [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                [{ 'font': [] }],
                [{ 'align': [] }],

                ['clean'],                                        // remove formatting button
                [ 'link', 'image' ],          // add's image support
            ]

        }
    }

    onEditorReady(quill: Quill){
        const result = quill.setContents(this.delta);
    }

    onEditorChange(e: any){
        const content: any[] = e.quill.editor.delta.ops;
        const text: string = e.text;
        this.$emit("change", { content, text });
    }

}
</script>