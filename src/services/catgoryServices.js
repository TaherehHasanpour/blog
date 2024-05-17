import axios from "../util/axios";
import {useToast} from "vue-toastification";
const toast=useToast();

export const getCategory = () => {
    return axios.get('api/Category').catch((e) => {
    toast.error("مشکلی رخ داده است");
    console.log(e)
    })
};
export const getCategoryBySlug = (categorySlug) => {
    return axios.get(`api/Category/GetBySlug/${categorySlug}`).catch((e) => {
    toast.error("مشکلی رخ داده است");
    console.log(e)
    })
}