import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Router from './Routes/router'
Vue.use(VueRouter)


//import store from './Store/store'


const router = new VueRouter({
    routes: Router,
    mode: 'history'
})

const app = new Vue({
    render: createElement => createElement(App),
    router
}).$mount('#app')

//new Vue({ render: createElement => createElement(App) }).$mount('#app');