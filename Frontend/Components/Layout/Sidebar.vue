<template>
  <div id="contenedor" class="colorPrincipal">
    <router-link to="/">
      <div class="boton">
        <span class="texto">Inicio</span>
      </div>
    </router-link>
    <router-link to="/clientes" v-if="esAdmin || tieneAcceso('Clientes', 1)">
      <div class="boton">
        <span class="texto">Cliente</span>
      </div>
    </router-link>
    <router-link to="/vehiculos" v-if="esAdmin || tieneAcceso('Vehiculos', 1)">
      <div class="boton">
        <span class="texto">Vehiculos</span>
      </div>
    </router-link>
    <router-link to="/roles" v-if="esAdmin || tieneAcceso('Roles', 1)">
      <div class="boton">
        <span class="texto">Roles</span>
      </div>
    </router-link>
    <router-link to="/servicios" v-if="esAdmin || tieneAcceso('Servicios', 1)">
      <div class="boton">
        <span class="texto">Servicios</span>
      </div>
    </router-link>
    <router-link to="/usuario" v-if="esAdmin || tieneAcceso('Usuarios', 1)">
      <div class="boton">
        <span class="texto">Usuarios</span>
      </div>
    </router-link>
    <router-link to="/editar">
      <div class="boton">
        <span class="texto">Cambiar contraseña</span>
      </div>
    </router-link>
    <div
      class="boton cursor-pointer"
      @click="cerrarSesion"
    >Cerrar Sesion {{$store.state.Permisos.Admin}}</div>
  </div>
</template>

<script>
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
#contenedor {
  z-index: 99999999999999;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.texto {
  color: black;
}

a {
  text-decoration: none;
}

.boton {
  margin: 10px 0;
  transition: 0.4s;
}
a:hover {
  background-color: #76c4f5;
  color: black;
  border-radius: 10px 20px;
}
</style>