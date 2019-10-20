import Vue from "vue";
import swal from "sweetalert";

declare module "vue/types/vue" {
    interface Vue {
        $swal: any
    }
}

Vue.prototype.$swal = swal;