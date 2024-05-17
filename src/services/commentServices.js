import axios from "../util/axios";
import {useToast} from "vue-toastification";
const toast=useToast();

export const getComment = (postId) => {
    return axios.get(`api/Comment?postId=${postId}`).catch((e) => {
    toast.error("مشکلی رخ داده است");
    console.log(e)
    })
};
export const addComment = (comment) => {
    return axios.post('api/Comment',comment).catch((e) => {
    toast.error("مشکلی رخ داده است");
    console.log(e)
    })
};
export const deleteComment = (id) => {
    return axios.delete(`api/Comment/${id}`).catch((e) => {
    toast.error("مشکلی رخ داده است");
    console.log(e)
    })
};