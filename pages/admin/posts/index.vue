<template>
    <section>
        <h1 class="page-title">文章編輯</h1>

        <nuxt-link to="/admin/posts/create">
            <div class="new-post">
                <font-awesome-icon :icon="['fas', 'plus-circle']" size="2x" :style="{ color: '#93989c' }" />  
            </div>
        </nuxt-link>

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
                    <div class="d-flex justify-content-between align-items-center text-secondary mt-3">
                        <div>
                            <b-form-checkbox 
                                v-model="post.publish"
                                :value="true"
                                :unchecked-value="false"
                                switch 
                                size="lg" 
                                button-variant="danger"
                                @change="postPublishChange($event, post._id)">
                                公開文章
                            </b-form-checkbox>
                        </div>

                        <div>
                            <span>最後更新日期: {{ post.updatedAt | dateFormatter("YYYY-MM-DD HH:mm") }}</span>
                            <span class="ml-3">
                                <font-awesome-icon :icon="['fas', 'eye']" />
                                {{ post.views }}
                            </span>
                        </div>
                    </div>
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


interface IData {
    posts: IPostClient[]
}

@Component({
    layout: "admin",
    middleware: "auth",
})
export default class AdminPosts extends Vue {
    posts: IData["posts"] = []

    async asyncData(context: Context): Promise<IData>{
        const { app, store }: { app: NuxtAppOptions, store: Store<IState> } = context;

        try {
            const { posts }: { posts: IData["posts"] } = await app.$axios.$get("/api/posts");
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

    async postPublishChange(publish: boolean, postId: string): Promise<void> {
        try {
            await this.$axios.patch(`/api/posts/${postId}`, { publish });
        } catch(e){
            console.log(e);
            this.$swal("修改失敗", "請查看console", "error");
        }
    }
}
</script>

<style lang="scss" scoped>
.new-post {
    border: 1px dashed #dee2e6;
    height: 100px;
    margin-bottom: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
}

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

// .custom-switch {
//     padding-left: 3rem;
// }

// .custom-control-label {
//     &::before {
//         width: 2.625rem;
//         height: 1.5rem;
//         left: -3rem;
//         border-radius: 0.75rem;
//     }

//     &::after {
//         width: calc(1.5rem - 4px);
//         height: calc(1.5rem - 4px);
//         left: calc(-3rem + 2px);
//         border-radius: 0.75rem;
//     }
// }

// .custom-control-input:checked ~ .custom-control-label::after {
//     transform: translateX(1.125rem);
// }
</style>