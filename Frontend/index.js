import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Router from './Routes/router'
import VueSweetalert2 from 'vue-sweetalert2';
Vue.use(VueSweetalert2)
Vue.use(VueRouter)

import axios from 'axios'
import store from './Store/store'
import {getCookie, setCookie} from  './Utils/cookies'

const router = new VueRouter({
    routes: Router,
    mode: 'history'
})



async function verificar(){
    try {
        store.commit('LoadingTrue')
        // Verifica si existe una sesion, o mejor dicho, si el JWT que esta en cookies todavia es valido
        let respuesta = await axios.get('/api/auth/verificar')
        store.commit('LogginTrue')

        await Promise.all([store.dispatch('Permisos'),store.dispatch('InformacionUsuario')])
        console.log('Termino el dispatch')
    } catch (error) {
        console.log('Token no valido')
        
    }finally {
        console.log('Estado de la aplicacion: Carga = false')
        store.commit('LoadingFalse')
    }
}

router.beforeEach( async (to, from, next) => {

    // Si existe un token JWT en cookies y no hay sesion activa
    // Verifica el token con el backend
    // Si no existe pues desactiva la pantalla de busqueda y lo deja pasar
    if(getCookie('JWT') !== null && !store.state.Loggeado){
        console.log('Verificando Token de sesion')
        await verificar()
    }else if(getCookie('JWT') === null && !store.state.Loggeado){
        console.log('No existe Token de sesion, por favor inicie sesion')
        store.commit('LoadingFalse')
    }

    // Si no esta loggeado y va a una seccion diferente de login,  lo redirige a login
    if(!store.state.Loggeado && to.path !==  '/login'){
        next('login')

        // Si esta loggeado y intenta entrar /login lo redirige a /inicio
    }else if(store.state.Loggeado && to.path == '/login' ){
        next('inicio')
    }else{
        // Si esta loggeado, no va a login, entonces lo deja pasar
        next()
    }
       

})

new Vue({
    render: createElement => createElement(App),
    router,
    store
}).$mount('#app')

//new Vue({ render: createElement => createElement(App) }).$mount('#app');