import Vue from "vue";
import moment from "moment";

Vue.filter("textLimiter", (value: string, limit: number) => {
    if(value.length <= limit) return value;
    return value.slice(0, limit) + "......";
});

Vue.filter("dateFormatter", (value: Date, format: string) => {
    if(format){
        return moment(value).format(format);
    } else {
        return moment(value).format("YYYY-MM-DD");
    }
})