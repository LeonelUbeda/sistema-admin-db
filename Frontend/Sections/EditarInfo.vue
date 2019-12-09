<template>
  <div id="contenedor">
    <div class="width-100 flex flex-col">
      <div>
        <div class="titulo">
          <h2 class="text-2xl">Editar usuario {{$store.state.Usuario.usuario}}</h2>
        </div>
      </div>

      <div>
        <div>
          <input type="password" v-model="contrasena" />
          <button @click="actualizar">Actualizar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import clasesUtilesCSS from "../assets/css/clasesUtiles";
import axios from "axios";
import "babel-polyfill";
import { msjActualizar } from "../Utils/swalRequest";

export default {
  data: () => {
    return {
      //editar contrasen;a
      contrasena: ""
    };
  },
  methods: {
    actualizar: function() {
      let url = "/api/usuarios/" + this.$store.state.Usuario.usuario;
      console.log(url);
      axios
        .put(url, { contrasena: this.contrasena })
        .then(respuesta => {
          console.log(respuesta.data);
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style lang="scss" scoped>
.v-leave {
  opacity: 1;
}
.v-leave-active {
  transition: opacity 0.7s;
}
.v-leave-to {
  opacity: 0;
}
.v-enter {
  opacity: 0;
}
.v-enter-active {
  transition: opacity 0.7s;
}
.v-enter-to {
  opacity: 1;
}

/*

.slide-enter-active {
   
   transition-duration: 1s;
   transition-timing-function: linear;
}

.slide-leave-active {
   transition-duration: 1s;

   transition-timing-function: linear;
}

.slide-enter-to, .slide-leave {
   max-height: 800px;
   overflow: hidden;
}

.slide-enter, .slide-leave-to {
    max-height: 0px;
   overflow: hidden;
}

*/

#sidebar {
  width: 25%;
  height: 200px;
}

#main {
  padding: 20px 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.contenedor-tabla {
  width: 70%;
}
</style>