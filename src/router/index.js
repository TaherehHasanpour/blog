import {createRouter, createWebHistory} from 'vue-router'
import MainLayout from "@/Layouts/MainLayout.vue";
import AdminLayout from "@/Layouts/AdminLayout.vue";


import IndexAdmin from "../pages/admin/IndexAdmin.vue";
import IndexPageUsers from '../pages/admin/users/IndexUser';
import AddUser from '../pages/admin/users/AddUser';
import EditUser from '../pages/admin/users/EditUser';
import IndexCategory from "@/pages/admin/category/IndexCategory";
import AddCategory from "@/pages/admin/category/AddCategory";
import EditCategory from "@/pages/admin/category/EditCategory";
import IndexPost from "@/pages/admin/post/indexPost";
import AddPost from "@/pages/admin/post/AddPost";
import EditPost from "@/pages/admin/post/EditPost";


import HomePage from '../pages/post/HomeView.vue';
import DetailPost from '../pages/post/DetailPost.vue';
import IndexSearch from '../pages/search/IndexSearch.vue';


import Page404 from '../pages/Page404.vue';

const routes = [
    {
        path: '/',
        component: MainLayout,
        children: [
            {
                path:"",
                name:"home",
                component: HomePage
            },
            {
                path:"/singlePost/:slug",
                name:"DetailPost",
                component: DetailPost
            },
            {
                path:"/search",
                name:"searchIndex",
                component: IndexSearch
            },
        ]
    },
    {
        path: "/admin",
        component: AdminLayout,
        children: [
            {
                path: "",
                component: IndexAdmin,
                name: "IndexAdmin"
            },
            {
                path: "users",
                component: IndexPageUsers
            },
            {
                path: "users/add",
                component: AddUser,
                name:"AddUser"
            },
            {
                path: "users/edit/:id",
                component: EditUser,
                name:"EditUser"
            },
            {
                path: "categories",
                component: IndexCategory,
                name: "IndexCategory"
            },
            {
                path: "categories/add",
                component: AddCategory,
                name:"AddCategory"
            },
            {
                path: "categories/edit/:id",
                component: EditCategory,
                name:"EditCategory"
            },
            {
                path: "posts",
                component: IndexPost,
                name: "IndexPosts"
            },
            {
                path: "post/add",
                component: AddPost,
                name:"AddPost"
            },
            {
                path: "post/edit/:id",
                component: EditPost,
                name:"EditPost"
            },
        ]
    },
    {
        path: '/:pathMatch(.*)',
        name: 'ErrorView',
        component: Page404,
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
