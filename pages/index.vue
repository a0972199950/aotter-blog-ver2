<template>
	<section class="w-100 h-100 d-flex justify-content-center align-items-center">
		<div class="card">
			<div class="card-body">
				<div class="form-group">
					<label for="email">帳號</label>
					<input type="text" id="email" class="form-control" v-model="email" placeholder="example@gmail.com">
				</div>

				<div class="form-group">
					<label for="password">密碼</label>
					<input type="password" id="password" class="form-control" v-model="password">
				</div>

				<button 
					class="btn btn-block btn-primary"
					@click="login">
					登入
				</button>

				<button 
					class="btn btn-block btn-primary"
					@click="signup">
					註冊
				</button>
			</div>
		</div>
	</section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { IUser } from "~/server/schemas/User";

@Component({
	middleware: "auth"
})
export default class Index extends Vue {
	email: string | null = null;
	password: string | null = null;

	async login(): Promise<void>{
		const { email, password } = this;
		try {
			const { user }: { user: IUser } = await this.$axios.$post("/api/users/login", { email, password });
			this.$store.commit("SET_USER", user);
			this.$router.push("/admin/profile");
		} catch(e){
			console.log(e.response.data.message);
		};
	}

	async signup(): Promise<void>{
		const { email, password } = this;
		try {
			const { user }: { user: IUser } = await this.$axios.$post("/api/users", { email, password });
			this.$store.commit("SET_USER", user);
			this.$router.push("/admin/profile");
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