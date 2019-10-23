<template>
    <section class="d-flex justify-content-center align-items-center">
		<div class="card">
			<div class="card-body">
				<p>{{ $v.$invalid }}</p>
				<div class="form-group">
					<label for="email">帳號</label>
					<input 
						type="text" 
						id="email" 
						class="form-control" 
						:class="{ 'is-invalid': $v.formData.email.$error }"
						placeholder="example@gmail.com"
						v-model="formData.email" 
						@blur="$v.formData.email.$touch()" >
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
						@blur="$v.formData.password.$touch()">
					<small class="invalid-feedback">密碼必填</small>
				</div>

                <div class="form-group">
					<label for="blogName">部落格名稱</label>
					<input 
						type="text" 
						id="blogName" 
						class="form-control"
						:class="{ 'is-invalid': $v.formData.blogName.$error }"
						v-model="formData.blogName" 
						@blur="$v.formData.blogName.$touch()">
					<small class="invalid-feedback">部落格名稱必填</small>
				</div>

				<button 
					class="btn btn-block btn-primary"
					@click="signup">
					確定註冊
				</button>

				<nuxt-link 
					class="btn btn-block btn-primary"
					to="/login">
					返回登入
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
        blogName: string | null
    }
}

@Component({
	middleware: "auth",

	validations: {
		formData: {
			email: { required, email },
			password: { required },
			blogName: { required }
		}
	}
})
export default class Signup extends mixins(validationMixin) {
    formData: IData["formData"] = {
        email: null,
        password: null,
        blogName: null
    }

    async signup(): Promise<void> {
		if(this.formInvalid()) return;

		const signupData = this.formData;

		try {
			await this.$store.dispatch("signup", signupData);
			const redirectUrl = this.$route.query.redirectUrl || "/admin/blog";
			if(typeof redirectUrl === "string"){
				this.$router.push(redirectUrl);
			}
		} catch(e){
			this.$swal.fire("註冊失敗", e.message, "error");
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