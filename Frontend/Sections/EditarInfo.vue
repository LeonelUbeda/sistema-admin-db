
<template>
  <div>
    <div>
      <div>
        <div class="titulo">
          <h2 class="text-2xl">Editar usuario {{$store.state.Usuario.usuario}}</h2>
        </div>
      </div>
      <div class="w-full max-w-xs md:items-center">
        <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" id="contenedor">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-4" for="nueva">Nueva Contraseña</label>
            <input
              type="password"
              class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Contraseña"
            />
            <button
              class="flex items-center justify-between button mb-4"
              @click="actualizar"
            >Actualizar</button>
          </div>
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
// input {
//   border: 1px solid black;
//   height: 25px;
//   margin-left: auto;
//   margin-right: auto;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// }
.button {
  background-color: rgb(18, 68, 233);
  border: none;
  color: white;
  padding: 5px 10px;
  text-align: center;
  display: flex;
  font-size: 16px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 8px;
}
// .contenedor {
//   justify-content: center;
// }
</style>