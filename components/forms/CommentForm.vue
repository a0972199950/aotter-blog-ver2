<template>
    <section>
        <nuxt-link v-if="!isLoggedIn" :to="`/login?redirectUrl=${$route.fullPath}`">
            <div class="login">
                <button class="btn btn-primary">登入以張貼留言</button>
            </div>
        </nuxt-link>

        <div v-if="isLoggedIn">
            <h3 class="font-weight-bold">張貼留言</h3>
            <textarea v-model="text" class="form-control" rows="2"></textarea>
            <div class="text-right mt-3">
                <button class="btn btn-primary" @click="save">送出</button>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { ICommentClient } from "~/interfaces/basic";

interface IData {
    text: ICommentClient["text"] | null
}

@Component
export default class CommentForm extends Vue {
    text: IData["text"] = null

    get isLoggedIn(): boolean {
        return !!this.$store.state.user;
    }

    save(): void {
        this.$emit("save", this.text);
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
