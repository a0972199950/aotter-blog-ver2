import { Context } from "@nuxt/types"
import { MutationTree, ActionTree, ActionContext } from "vuex";
import { IUserClient, IBlogClient } from "~/interfaces/basic";


export interface IState {
  user: IUserClient | null
  blog: IBlogClient | null
}

export const state = (): IState => ({
  user: null,
  blog: null
});

export const mutations: MutationTree<IState> = {
  SET_USER(state: IState, user: IUserClient){
    state.user = user;
  },

  CLEAR_USER(state: IState){
    state.user = null;
  },

  SET_BLOG(state: IState, blog: IBlogClient){
    state.blog = blog
  },

  CLEAR_BLOG(state: IState){
    state.blog = null;
  },
};

interface ISignupData {
	email: string | null
	password: string | null
	blogName: string | null
}

interface ILoginData {
	email: string | null
	password: string | null
}


export const actions: ActionTree<IState, IState> = {
	async nuxtServerInit(vuexContext: ActionContext<IState, IState>, context: Context): Promise<void>{
		const { app } = context;

		try {
			const { user }: { user: IUserClient } = await app.$axios.$get("/api/users/profile");
			const { blog }: { blog: IBlogClient } = await app.$axios.$get(`/api/blogs/me`);
			vuexContext.commit("SET_USER", user);
			vuexContext.commit("SET_BLOG", blog);
		} catch(e){
			console.log(e.response);
		}
	},

	async signup(vuexContext: ActionContext<IState, IState>, signupData: ISignupData): Promise<boolean> {
		try {
			const { user }: { user: IUserClient } = await this.$axios.$post("/api/users", signupData);
			const { blog }: { blog: IBlogClient } = await this.$axios.$get(`/api/blogs/me`);
			vuexContext.commit("SET_USER", user);
			vuexContext.commit("SET_BLOG", blog);
			return true;
		} catch(e){
			console.log(e.response);
			return false;
		};
	},

	async login(vuexContext: ActionContext<IState, IState>, loginData: ILoginData): Promise<void | Error> {
		try {
			const { user }: { user: IUserClient } = await this.$axios.$post("/api/users/login", loginData);
			const { blog }: { blog: IBlogClient } = await this.$axios.$get(`/api/blogs/me`);
			vuexContext.commit("SET_USER", user);
			vuexContext.commit("SET_BLOG", blog);
		} catch(e){
			console.log(e.response);
			throw new Error(e.response.data.message);
		};
	},

	async logout(vuexContext: ActionContext<IState, IState>): Promise<void | Error> {
		try {
            await this.$axios.$get("/api/users/logout");
			vuexContext.commit("CLEAR_USER");
			vuexContext.commit("CLEAR_BLOG");
        } catch (e) {
			console.log(e.response);
			throw new Error(e.response.data.message);
        }
	},

	async logoutAll(vuexContext: ActionContext<IState, IState>): Promise<void | Error> {
		try {
            await this.$axios.$get("/api/users/logout/all");
			vuexContext.commit("CLEAR_USER");
			vuexContext.commit("CLEAR_BLOG");
        } catch (e) {
			console.log(e.response);
			throw new Error(e.response.data.message);
        }
	},
}