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

export const actions: ActionTree<IState, IState> = {
  async nuxtServerInit(vuexContext: ActionContext<IState, IState>, context: Context): Promise<void>{
    const { app } = context;
    
    try {
      const { user }: { user: IUserClient } = await app.$axios.$get("/api/users/profile");
      const { blog }: { blog: IBlogClient } = await app.$axios.$get(`/api/blogs/${user.blog}`);
      vuexContext.commit("SET_USER", user);
      vuexContext.commit("SET_BLOG", blog);
    } catch(e){
      console.log(e.response.data.message);
    }
  }
}