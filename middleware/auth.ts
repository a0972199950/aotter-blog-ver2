import { Middleware, Context } from "@nuxt/types";
import { Store } from "vuex";
import { IState } from "~/store/index";

interface IContextDestructured {
    store: Store<IState>,
    redirect: Context["redirect"],
    route: Context["route"]
}

const auth: Middleware = (context: Context): void => {
    const { store, redirect, route }: IContextDestructured = context;
    
    if(!store.state.user._id){
        return redirect("/");
    }

    if(route.path === "/"){
        return redirect("/admin/profile");
    }
}

export default auth;