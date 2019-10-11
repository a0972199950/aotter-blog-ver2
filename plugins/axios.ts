import Vue from "vue";
import swal from "sweetalert";
import { NuxtAxiosInstance } from "@nuxtjs/axios";


declare module "vue/types/vue" {
    interface Vue {
        $axios: NuxtAxiosInstance
        $swal: any
    }
}

Vue.prototype.$swal = swal;