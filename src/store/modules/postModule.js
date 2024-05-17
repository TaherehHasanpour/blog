import axios from "@/util/axios";
import {useToast} from "vue-toastification";


const toast = useToast()
export default {
    state: {
        postsFilter: {}
    },
    getters: {},
    mutations: {

    },
    actions: {
        getPostsFilter(context, {pageId, take, title}) {
            context.commit("setLoading", true);
            return axios.get("/api/Post",{params: {pageId, take, title}}).finally(() => context.commit("setLoading", false))
        },
        addPost(context, post) {
            context.commit("setLoading", true);
            return axios.post(`/api/Post`, post).finally(() => context.commit("setLoading", false))
        },
        editPost(context, post) {
            context.commit("setLoading", true);
            return axios.put(`/api/Post`, post).finally(() => context.commit("setLoading", false))
        },
        getPostById(context, id) {
            context.commit("setLoading", true);
           return  axios.get(`/api/Post/${id}`).finally(() => context.commit("setLoading", false));
        },
        deletePost(context, id) {
            context.commit("setLoading", true);
            return axios.delete(`/api/Post/${id}`).finally(() => context.commit("setLoading", false))
        },
        getPostBySlug(context, slug) {
            context.commit("setLoading", true);
            axios.get(`/api/Post/getBySlug/${slug}`).then(r => {
                context.commit("setSinglePost", r.data);
            }).finally(() => context.commit("setLoading", false));
        },
    }
}