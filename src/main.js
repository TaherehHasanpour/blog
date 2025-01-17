import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import {loadFonts} from './plugins/webfontloader'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

loadFonts()
const options = {

    rtl:true
};


createApp(App)
    .use(router)
    .use(store)
    .use(vuetify)
    .use(Toast,{
    rtl:true
})
    .mount('#app')
