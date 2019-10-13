<template>
    <section class="container">
        <h1 class="page-title">我的頁面</h1>

        <label>大頭照</label>
        <div class="avatar mb-3">
            <img :src="avatarUrl" ref="avatar">
            <div class="middle">
                <button @click="changeAvatar" class="btn btn-secondary rounded-circle">
                    <font-awesome-icon :icon="['fas', 'camera']" />
                </button>
                <input type="file" ref="fileSelector" @change="fileSelected" style="display: none">
            </div>
        </div>

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

interface Data {
    avatarUrl: IUserClient["avatarUrl"] | null
    formData: FormData | null
}

@Component({
    middleware: "auth",
    layout: "admin"
})
export default class AdminProfile extends Vue {
    avatarUrl: Data["avatarUrl"] = null
    formData: Data["formData"] = null

    asyncData(context: Context): Data | void{
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

    changeAvatar(){
        const fileSelector = this.$refs.fileSelector;
        if(fileSelector instanceof HTMLElement){
            fileSelector.click();
        }
    }

    async fileSelected(e: any): Promise<void>{
        const avatar = e.target.files[0];
        const formData = new FormData();
        const img = this.$refs.avatar;

        formData.append("avatar", avatar);
        try {
            const { user } = await this.$axios.$post("/api/users/avatar", formData);
            this.$store.commit("SET_USER", user);

            if(img instanceof HTMLImageElement){
                img.src = user.avatarUrl;
                this.$swal("更新成功", "", "success");
            }
        } catch(e){
            this.$swal("更新失敗", "", "error");
        }
        
    }

    async save(): Promise<void>{
        const updates = this.formData;

        try {
            const { user }: { user: IUserClient } = await this.$axios.$patch(`/api/users/profile`, updates);
            this.$store.commit("SET_USER", user);
            this.$swal("更新成功", "", "success");
        } catch(e){
            console.log(e.response);
        }
    }
}
</script>

<style lang="scss" scoped>
.avatar {
    width: 250px;
    height: 250px;
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