import {createStore} from 'vuex'
import userModule from "@/store/modules/userModule";
import categoryModule from "@/store/modules/categoryModule";
import postModule from "@/store/modules/postModule";

export default createStore({
    state: {
        loading: false
    },
    getters: {},
    mutations: {
        setLoading(state, loading) {
            state.loading = loading
        }
    },
    actions: {},
    modules: {
        userModule,
        categoryModule,
        postModule
    }
})
