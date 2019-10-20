<template>
	<section class="d-flex justify-content-center align-items-center">
		<div class="card">
			<div class="card-body">
				<div class="form-group">
					<label for="email">帳號</label>
					<input 
						type="text" 
						id="email" 
						class="form-control" 
						:class="{ 'is-invalid': $v.formData.email.$error }"
						placeholder="example@gmail.com"
						v-model="formData.email" 
						@blur="$v.formData.email.$touch()">
					<small class="invalid-feedback">email格式不正確</small>
				</div>

				<div class="form-group">
					<label for="password">密碼</label>
					<input 
						type="password" 
						id="password" 
						class="form-control" 
						:class="{ 'is-invalid': $v.formData.password.$error }"
						v-model="formData.password"
						@blur="$v.formData.password.$touch()" >
					<small class="invalid-feedback">密碼必填</small>
				</div>

				<button 
					class="btn btn-block btn-primary"
					@click="login">
					登入
				</button>

				<nuxt-link 
					class="btn btn-block btn-primary"
					to="/signup">
					前往註冊
				</nuxt-link>
			</div>
		</div>
	</section>
</template>


<script lang="ts">
import { Component, Vue, mixins } from 'nuxt-property-decorator';
import { validationMixin } from "vuelidate";
import { email, required } from "vuelidate/lib/validators";
import { IUserClient, IBlogClient } from "~/interfaces/basic";

interface IData {
	formData: {
		email: string | null
		password: string | null
	}
}

@Component({
	middleware: "auth",

	validations: {
		formData: {
			email: { required, email },
			password: { required }
		}
	}
})
export default class Index extends mixins(validationMixin) {
	formData: IData["formData"] = {
		email: null,
		password: null
	}

	async login(): Promise<void> {
		if(this.formInvalid()) return;

		const loginData = this.formData;
		
		try {
			await this.$store.dispatch("login", loginData);

			const redirectUrl = this.$route.query.redirectUrl || "/blogs";
			if(typeof redirectUrl === "string"){
				this.$router.push(redirectUrl);
			}
		} catch(e){
			this.$swal("登入失敗", e.message, "error");
		}
	}

	formInvalid(): boolean {
		this.$v.$touch();
		return this.$v.$invalid;
	}
}
</script>

<style lang="scss" scoped>
section {
	width: 100vw;
	height: 100vh;

	.card {
		background: rgba(255, 255, 255, .8);
		.card-body {
			width: 20rem;
		}
	}
}
</style>