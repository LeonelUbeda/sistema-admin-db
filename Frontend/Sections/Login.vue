
<template>
    <div class="flex justify-center flex-col" id="contenedor">

        <div class="mensaje-rojo" v-if="incorrecto">
            Credenciales incorrectas
        </div>
        <div class="flex flex-col">

            <input type="text" v-model="usuario" placeholder="Usuario">
            <input type="text" v-model="contrasena" placeholder="Contraseña">
        </div>
        <h2 @click="enviar">ENVIAR</h2>
    </div>

</template>



<script>
import axios from 'axios'
import {setCookie} from '../Utils/cookies'
export default {
    data: () => {
        return{
            incorrecto: false,
            usuario: '',
            contrasena: '',
        }
    },
    methods: {
        enviar: function(){
            this.$store.commit('LoadingTrue')
            axios.post('/api/auth/login', {
                usuario: this.usuario,
                contrasena: this.contrasena
            })
            .then(async (respuesta) => {
                this.$store.commit('LogginTrue')
                setCookie('JWT', respuesta.data, 15)
                await this.$store.dispatch('Permisos')
                this.$router.push('inicio')
            })
            .catch(() => {
                console.log('Loggin incorrecto')
                this.incorrecto = true
            })
            .finally(() => this.$store.commit('LoadingFalse'))
        }
    }
}
</script>

<style scoped>
#contenedor{
    width: 200px;
}
input{
    border: 1px solid black;
    height: 25px;
}
</style>