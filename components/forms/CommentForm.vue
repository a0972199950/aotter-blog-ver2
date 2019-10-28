<template>
    <section>
        <nuxt-link v-if="!isLoggedIn" :to="`/login?redirectUrl=${$route.fullPath}`">
            <div class="login">
                <button class="btn btn-primary">登入以張貼留言</button>
            </div>
        </nuxt-link>

        <div v-if="isLoggedIn">
            <h3 class="font-weight-bold">張貼留言</h3>
            <textarea :value="text" @input="onInput" class="form-control" rows="2"></textarea>
            <div class="text-right mt-3">
                <button class="btn btn-primary" @click="save">送出</button>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import { ICommentClient } from "~/interfaces/basic";

interface IProp {
    text: ICommentClient["text"] | null
}

@Component
export default class CommentForm extends Vue {
    @Prop({ type: String, default: "" })
    text!: IProp["text"]

    get isLoggedIn(): boolean {
        return !!this.$store.state.user;
    }

    onInput(e: any): void {
        this.$emit("input", e.target.value);
    }

    save(): void {
        this.$emit("save");
    }
}
</script>

<style lang="scss" scoped>
.login {
    border: 1px dashed #dee2e6;
    height: 100px;
    margin-bottom: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
}

textarea {
    border: 3px #dee2e6 solid;
}
</style>
