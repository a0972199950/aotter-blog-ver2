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
    const path = route.path;
    const isLogined = !!store.state.user;

    switch(path){
        case "/login":
            if(isLogined) return redirect("/blogs");
            break;

        case "/signup":
            if(isLogined) return redirect("/blogs");
            break;

        default: 
            if(!isLogined) return redirect("/login");
            break;
    }
}

export default auth;