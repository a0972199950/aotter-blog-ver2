<template>
    <section>
        <h1 class="page-title">文章編輯</h1>

        <nuxt-link to="/admin/posts/create" class="btn btn-primary btn-block mb-3">新增</nuxt-link>

        <div 
            v-for="(post, index) in posts"
            :key="index">
            <ul class="nav nav-tabs justify-content-end">
                <li class="nav-item nav-link active p-0 d-flex">
                    <nuxt-link :to="`/admin/posts/${post._id}`" class="nav-link edit">編輯</nuxt-link>
                    <button class="nav-link delete" @click="remove(post._id)">刪除</button>
                </li>
            </ul>

            <div class="media border mb-2 p-3">
                <div class="media-body">
                    <h3 class="mt-0 font-weight-bold">{{ post.title }}</h3>
                    {{ post.text | textLimiter(95) }}
                    <div class="d-flex justify-content-end text-secondary mt-2">最後更新日期: {{ post.updatedAt | dateFormatter("YYYY-MM-DD HH:mm") }}</div>
                </div>
            </div>
        </div>

    </section>
</template>


<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { Context, NuxtAppOptions } from "@nuxt/types";
import { Store } from "vuex";
import { IState } from "~/store/index";
import { IPostClient } from "~/interfaces/basic"


interface Data {
    posts: IPostClient[]
}

@Component({
    layout: "admin",
    middleware: "auth",
})
export default class AdminPosts extends Vue {
    posts: Data["posts"] = []

    async asyncData(context: Context): Promise<Data>{
        const { app, store }: { app: NuxtAppOptions, store: Store<IState> } = context;

        try {
            const { posts }: { posts: Data["posts"] } = await app.$axios.$get("/api/posts");
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
                this.$swal("刪除失敗", "請查看console", "error");
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.edit, .delete {
    background: white;
    color: inherit;
    border-radius: 0;
}

.edit:hover {
    background: #007BFF;
    color: white;
}

.delete:hover {
    background: red;
    color: white;
}
</style>