import { Context } from "@nuxt/types"
import { MutationTree, ActionTree, ActionContext } from "vuex";
import { IUser } from "~/interfaces/User";


export interface IState {
  user: IUser
}

export const state = (): IState => ({
  user: {
    _id: null,
    email: null,
    avatarUrl: null,
    name: null,
    birthday: null,
    phone: null,
    blogName: null,
    blogIntro: null
  }
});

export const mutations: MutationTree<IState> = {
  SET_USER(state: IState, user: IUser){
    state.user = user;
  },

  CLEAR_USER(state: IState){
    state.user = {
      _id: null,
      email: null,
      avatarUrl: null,
      name: null,
      birthday: null,
      phone: null,
      blogName: null,
      blogIntro: null
    }
  }
};

export const actions: ActionTree<IState, IState> = {
  async nuxtServerInit(vuexContext: ActionContext<IState, IState>, context: Context): Promise<void>{
    const { app } = context;
    
    try {
      const { user } = await app.$axios.$get("/api/users/profile");
      vuexContext.commit("SET_USER", user);
    } catch(e){
      console.log(e.response.data.message);
    }
  }
}