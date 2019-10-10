<template>
    <section>
        <nuxt-link to="/admin/posts/create" class="btn btn-primary btn-block mb-3">新增</nuxt-link>

        <div 
            v-for="(post, index) in posts"
            :key="index"
            class="media border rounded mb-2">

            <img src="https://picsum.photos/100/100" class="mr-3" alt="...">
            <div class="media-body">
                <h5 class="mt-0">{{ post.title }}</h5>
                {{ post.content }}
            </div>

            <nuxt-link :to="`/admin/posts/${post._id}`" class="btn btn-primary">編輯</nuxt-link>
            <button class="btn btn-danger" @click="remove(post._id)">刪除</button>
        </div>

    </section>
</template>


<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { Context, NuxtAppOptions } from "@nuxt/types";
import { Store } from "vuex";
import { IState } from "~/store/index";

interface Post {
    title: string | null,
    content: string | null
}

interface Data {
    posts: Post[]
}

@Component({
    layout: "admin"
})
export default class AdminPosts extends Vue {
    posts: Data["posts"] = []

    async asyncData(context: Context): Promise<Data | void>{
        const { app, store }: { app: NuxtAppOptions, store: Store<IState> } = context;
        const userId = store.state.user._id;

        try {
            const { posts }: { posts: Data["posts"] } = await app.$axios.$get(`/api/posts/all/${userId}`);
            return { posts }
        } catch(e){
            console.log(e.response);
            return { posts: [] };
        }
    }

    async remove(postId: string): Promise<void>{
        if(confirm("確定要刪除嗎？")){
            try {
                await this.$axios.delete(`/api/posts/${postId}`);
                this.$router.go(0);
            } catch(e){
                console.log(e);
                alert("刪除失敗");
            }
        }
    }
}
</script>