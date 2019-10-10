<template>
    <section class="w-100 h-100 d-flex justify-content-center align-items-center">
		<div class="card">
			<div class="card-body">
				<div class="form-group">
					<label for="email">帳號</label>
					<input type="text" id="email" class="form-control" v-model="formData.email" placeholder="example@gmail.com">
				</div>

				<div class="form-group">
					<label for="password">密碼</label>
					<input type="password" id="password" class="form-control" v-model="formData.password">
				</div>

                <div class="form-group">
					<label for="blogName">部落格名稱</label>
					<input type="text" id="blogName" class="form-control" v-model="formData.blogName">
				</div>

				<button 
					class="btn btn-block btn-primary"
					@click="signup">
					確定註冊
				</button>
			</div>
		</div>
	</section>
</template>


<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { IUser } from "~/interfaces/User";

interface Data {
    formData: {
        email: string | null
        password: string | null
        blogName: string | null
    }
}

@Component
export default class Signup extends Vue {
    formData: Data["formData"] = {
        email: null,
        password: null,
        blogName: null
    }

    async signup(): Promise<void>{
        const signupData = this.formData;
        
		try {
			const { user }: { user: IUser } = await this.$axios.$post("/api/users", signupData);
			this.$store.commit("SET_USER", user);
			this.$router.push("/admin/blog");
		} catch(e){
			console.log(e.response.data.message);
		};
	}
}
</script>

<style lang="scss" scoped>
.card {
	background: rgba(255, 255, 255, .8);
	.card-body {
		width: 16rem;
	}
}
</style>