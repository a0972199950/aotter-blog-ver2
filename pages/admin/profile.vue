<template>
    <section class="container">
        <h3>我的頁面</h3>

        <div class="avatar">
            <img :src="avatarUrl" ref="avatar">
            <div class="middle">
                <button @click="changeAvatar" class="btn btn-primary rounded-0">變更頭像</button>
                <input type="file" ref="fileSelector" @change="fileSelected" style="display: none">
            </div>
        </div>

        <div class="form-group">
            <label for="name">姓名</label>
            <input type="text" id="name" v-model="formData.name" class="form-control">
        </div>

        <div class="form-group">
            <label for="birthday">生日</label>
            <input type="date" id="birthday" v-model="formData.birthday" class="form-control">
        </div>

        <div class="form-group">
            <label for="phone">連絡電話</label>
            <input type="text" id="phone" v-model="formData.phone" class="form-control">
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
    name: string | null,
    birthday: string | null,
    phone: string | null
}

interface Data {
    avatarUrl: string | null
    formData: FormData
}

@Component({
    middleware: "auth",
    layout: "admin"
})
export default class AdminProfile extends Vue {
    avatarUrl: Data["avatarUrl"] = null
    formData: FormData = {
        name: null,
        birthday: null,
        phone: null
    }

    asyncData(context: Context): Data | void{
        const store: Store<IState> = context.store;
        const user = store.state.user;
        if(user){
            return {
                avatarUrl: user.avatarUrl,
                formData: {
                    name: user.name,
                    birthday: user.birthday,
                    phone: user.phone
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