<template>
  <div id="contenedor" class="colorPrincipal">
    <div class="flex flex-col width-100">
      <div class="imagen width-100 flex justify-center mb-3 mt-1">
        <img src="../../assets/img/logo.png" alt="">
      </div>
      <router-link to="/inicio">
      <div class="boton">
        <h3 class="texto">Inicio</h3>
      </div>
      </router-link>
      <router-link to="/clientes" v-if="esAdmin || tieneAcceso('Clientes', 1)">
        <div class="boton">
          <h3 class="texto">Cliente</h3>
        </div>
      </router-link>
      <router-link to="/clasificacion" v-if="esAdmin || tieneAcceso('Clasificacion', 1)">
        <div class="boton">
          <h3 class="texto">Clasificacion</h3>
        </div>
      </router-link>
      <router-link to="/roles" v-if="esAdmin">
        <div class="boton">
          <h3 class="texto">Roles</h3>
        </div>
      </router-link>
      <router-link to="/servicios" v-if="esAdmin || tieneAcceso('Servicios', 1)">
        <div class="boton">
          <h3 class="texto">Servicios</h3>
        </div>
      </router-link>
      <router-link to="/ticket" v-if="esAdmin || tieneAcceso('Tickets', 1)">
        <div class="boton">
          <h3 class="texto">Ticket</h3>
        </div>
      </router-link>
      <router-link to="/usuario" v-if="esAdmin || tieneAcceso('Usuarios', 1)">
        <div class="boton">
          <h3 class="texto">Usuarios</h3>
        </div>
      </router-link>
      <router-link to="/editar">
        <div class="boton">
          <h3 class="texto">Cambiar contraseña</h3>
        </div>
      </router-link>
      <div
        class="boton cursor-pointer"
        @click="cerrarSesion"
      >Cerrar Sesion {{$store.state.Permisos.Admin}}</div>
    </div>
    
    
  </div>
    
</template>

<script>
import Logo from '../../assets/img/logo.png'
import themeColors from "../../assets/css/themeColors.css";
import { esAdmin, tieneAcceso } from "../../Utils/verificaciones";

export default {
  data: () => {
    return {};
  },
  methods: {
    tieneAcceso(seccion, minimoRequerido) {
      return tieneAcceso(this.$store.state.Permisos, seccion, minimoRequerido);
    },
    cerrarSesion: function() {
      this.$store.dispatch("Logout");
      this.$router.push("login");
    }
  },
  computed: {
    esAdmin: function() {
      return esAdmin(this.$store.state.Permisos);
    }
  }
};
</script>

<style lang="scss" scoped>

img{
  width: 70%;
  height: auto;
}

#contenedor {
  z-index: 99999999999999;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
 
}

.texto {
  color: black;
}

a {
  text-decoration: none;
}

.boton {

  margin: 10px 0;
  width: 100%;
  height: auto;
  padding: 5px 0 ;
  padding-left: 15px;
  transition: 0.4s;
}
.boton:hover {
  //background-color: #76c4f5;
  background-color: rgb(228, 228, 228);
  padding-left: 25px;

}
</style>