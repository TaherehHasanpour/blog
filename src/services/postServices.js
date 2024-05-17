import axios from "../util/axios";
import {useToast} from "vue-toastification";
const toast=useToast();

export const getPopularPost = () => {
    return axios.get('api/Post/popular').catch((e) => {
    toast.error("مشکلی رخ داده است");
    console.log(e)
    })
};
export const getPostBySlug = (slug) => {
    return axios.get(`api/Post/getBySlug/${slug}`).catch((e) => {
    toast.error("مشکلی رخ داده است");
    console.log(e)
    })
}