<template>
    <section class="d-flex justify-content-center align-items-center">
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
import { Component, Vue } from 'nuxt-property-decorator';
import { IUserClient, IBlogClient } from "~/interfaces/basic";

interface Data {
    formData: {
        email: string | null
        password: string | null
        blogName: string | null
    }
}

@Component({
	middleware: "auth"
})
export default class Signup extends Vue {
    formData: Data["formData"] = {
        email: null,
        password: null,
        blogName: null
    }

    async signup(): Promise<void>{
        const signupData = this.formData;
        
		try {
			const { user }: { user: IUserClient } = await this.$axios.$post("/api/users", signupData);
			const { blog }: { blog: IBlogClient } = await this.$axios.$get(`/api/blogs/${user.blog}`);
			this.$store.commit("SET_USER", user);
			this.$store.commit("SET_BLOG", blog);
			this.$router.push("/admin/blog");
		} catch(e){
			console.log(e.response.data.message);
		};
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
			width: 16rem;
		}
	}
}
</style>