<template>
    <section>
        <h1 class="page-title">我的頁面</h1>

        <ImageInputer 
            title="大頭照"
            width="250px"
            height="250px"
            :imageUrl="avatarUrl"
            @fileSelected="fileSelected" />

        <div class="form-group">
            <label for="name">姓名</label>
            <input type="text" id="name" v-model="formData.name" class="form-control">
        </div>

        <div class="form-group">
            <label for="facebook">Facebook</label>
            <input type="text" id="facebook" v-model="formData.socialMedias.facebook" class="form-control">
        </div>

        <div class="form-group">
            <label for="twitter">Twitter</label>
            <input type="text" id="twitter" v-model="formData.socialMedias.twitter" class="form-control">
        </div>

        <div class="form-group">
            <label for="instagram">Instagram</label>
            <input type="text" id="instagram" v-model="formData.socialMedias.instagram" class="form-control">
        </div>

        <button class="btn btn-primary btn-block" @click="save">儲存</button>
    </section>
</template>


<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { Context } from "@nuxt/types";
import { Store } from "vuex";
import { IState } from "~/store/index";
import { IUserClient } from "~/interfaces/basic";


interface FormData {
    name: IUserClient["name"]
    socialMedias: IUserClient["socialMedias"]
}

interface IData {
    avatarUrl: IUserClient["avatarUrl"] | null
    formData: FormData | null
}

@Component({
    middleware: "auth",
    layout: "admin",
    components: {
        ImageInputer: () => import("~/components/UIWidgets/ImageInputer.vue"),
    }
})
export default class AdminProfile extends Vue {
    avatarUrl: IData["avatarUrl"] = null
    formData: IData["formData"] = null

    asyncData(context: Context): IData | void {
        const store: Store<IState> = context.store;
        const user = store.state.user;
        if(user){
            return {
                avatarUrl: user.avatarUrl,
                formData: {
                    name: user.name,
                    socialMedias: user.socialMedias || {
                        facebook: null,
                        twitter: null,
                        instagram: null
                    }
                }
            }
        }
    }

    async fileSelected(avatar: Blob): Promise<void> {
        const formData = new FormData();
        formData.append("avatar", avatar);

        try {
            const { user } = await this.$axios.$post("/api/users/avatar", formData);
            this.$store.commit("SET_USER", user);

            this.$swal.fire("更新成功", "", "success");
        } catch(e){
            console.log(e.response);
            this.$swal.fire("更新失敗", "", "error");
        }
        
    }

    async save(): Promise<void> {
        const updates = this.formData;

        try {
            const { user }: { user: IUserClient } = await this.$axios.$patch(`/api/users/profile`, updates);
            this.$store.commit("SET_USER", user);
            this.$swal.fire("更新成功", "", "success");
        } catch(e){
            console.log(e.response);
            this.$swal.fire("更新失敗", "", "error");
        }
    }
}
</script>

