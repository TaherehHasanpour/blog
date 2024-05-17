import axios from "../../util/axios"

export default {
    state: {
        users: {},
        singleUser: {}
    },
    getters: {},
    mutations: {
        setUsers(state, users) {
            state.users = users;
        },
        setSingleUser(state, user) {
            state.singleUser = user;
        }
    },
    actions: {
        getUsers(context, {pageId, take}) {
            context.commit("setLoading", true);
            axios.get(`api/user?pageId=${pageId}&take=${take}`).then(r => {
                context.commit("setUsers", r.data);

            }).catch(err => {
                console.log(err)
            }).finally(() => context.commit("setLoading", false));

        },
        getSingleUser(context, userId) {
            context.commit("setLoading", true);
            axios.get(`api/user/${userId}`).then(r => {
                context.commit("setSingleUser", r.data)
            }).catch(err => {
                console.log(err)
            }).finally(() => context.commit("setLoading", false));
        },
        addUser(context, user) {
            context.commit("setLoading", true);
            return axios.post(`api/user`, user).finally(() => context.commit("setLoading", false));
        },
        editUser(context, user) {
            context.commit("setLoading", true);
            return axios.put(`api/user`, user).finally(() => context.commit("setLoading", false));
        }
    }
}