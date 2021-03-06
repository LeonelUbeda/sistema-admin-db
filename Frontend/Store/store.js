import Vue from 'vue'
import Vuex from 'vuex'
import {getCookie, setCookie, eraseCookie} from '../Utils/cookies'
import router from '../Routes/router'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        Loading: true,
        Loggeado: false,
        Permisos: {},
        Usuario: {},
        CookieTimer: 10000,
    
    },
    getters: {
        Permisos: state => state.Permisos
    },
    mutations: {
        LoadingFalse: state => state.Loading = false,
        LoadingTrue: state => state.Loading = true,
        LogginFalse: state => state.Loggeado = false,
        LogginTrue: state => state.Loggeado = true,
        PermisosIgual (state, permisos) {
            let permisosFormateado = {}
            for(let elemento of permisos.Permisos){
                permisosFormateado[elemento.nombre] = elemento.RolPermiso.nivelAcceso
            }
            state.Permisos = permisosFormateado
        },
        InfoUsuario (state, permisos){
            state.Usuario = permisos
        },
        AdminMode (state) {
            state.Permisos.admin = true
        },
        SinPermisos(state) {
            state.Permisos = {
                sinPermiso: true
            }
        }
    },
    actions: {
        Logout ({commit}) {
            commit('LogginFalse')
            eraseCookie('JWT')
        },
        async Permisos (context) {
                try {
                    context.commit('LoadingTrue')
                    let respuesta = await axios.get('/api/auth/sesionpermisos')
                    console.log('Pasando por dispatch Permisos')
                    if(respuesta.data !== null ){
                        console.log('El usuario tiene un rol, asignando roles...')
                        if(respuesta.data.Admin === true){
                            context.commit('AdminMode')
                        }else{
                            context.commit('PermisosIgual', respuesta.data)
                        }
                    }else{
                        console.log('El usuario no tiene un rol!')
                        context.commit('SinPermisos')
                   
                        
                    }                                 
                } catch (error) {
                    console.log(error)
                }finally{
                    context.commit('LoadingFalse')
                    console.log('Proceso de asignacion de roles terminado!')
                }
        

           
        },
        async InformacionUsuario(context){
            try {
                let respuesta = await axios.get('/api/auth/info')
                context.commit('InfoUsuario', respuesta.data)
            } catch (error) {
                console.log(error)
            }
        }
    }
})