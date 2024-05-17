import axios from "@/util/axios";

export default {
    state: {
        category: [],
        singleCategory: {}
    },
    getters: {},
    mutations: {
        setCategory(state, category) {
            state.category = category;
        },
        setSingleCategory(state, singleCategory) {
            state.singleCategory = singleCategory;
        },
    },
    actions: {
        getCategory(context) {
            context.commit("setLoading", true);
            axios.get("/api/Category").then(r => {
                context.commit("setCategory", r.data);
            }).finally(() => context.commit("setLoading", false))
        },
        getCategoryById(context, id) {
            context.commit("setLoading", true);
            axios.get(`/api/Category/${id}`).then(r => {
                context.commit("setSingleCategory", r.data);
            }).finally(() => context.commit("setLoading", false));
        },
        deleteCategory(context, id) {
            context.commit("setLoading", true);
            return axios.delete(`/api/Category/${id}`).finally(() => context.commit("setLoading", false))
        },
        addCategory(context, category) {
            context.commit("setLoading", true);
            return axios.post(`/api/Category`, category).finally(() => context.commit("setLoading", false))
        },
        editCategory(context, category) {
            context.commit("setLoading", true);
            return axios.put(`/api/Category`, category).finally(() => context.commit("setLoading", false))
        },
    }
}