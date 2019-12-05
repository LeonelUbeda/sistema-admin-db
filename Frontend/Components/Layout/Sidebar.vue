<template>
    <div id="contenedor" class="colorPrincipal">
        <router-link to="/">
            <div class="boton">
                <span class="texto">Inicio</span>
            </div>
        </router-link>  
        <router-link to="/cliente">
            <div class="boton">
                <span class="texto">Cliente</span>
            </div>
        </router-link>
        <router-link to="/login">
            <div class="boton">
                <span class="texto">Login</span>
            </div>
        </router-link>
        <router-link to="/marca">
            <div class="boton">
                <span class="texto">Marca</span>
            </div>
        </router-link>
        <router-link to="/roles">
            <div class="boton">
                <span class="texto">Roles</span>
            </div>
        </router-link>
        <router-link to="/servicios">
            <div class="boton">
                <span class="texto">Servicios</span>
            </div>
        </router-link>
         <router-link to="/usuario">
            <div class="boton">
                <span class="texto">Usuarios</span>
            </div>
        </router-link>
    </div>
</template>

<script>

import themeColors from '../../assets/css/themeColors.css'



export default {
    data: () => {
        return{
            nombre: 'Holi',
            
        }
    }
}
</script>

<style lang="scss" scoped>


#contenedor{
    z-index: 99999999999999;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.texto{
    color: black;
}

a{
    text-decoration: none;
}

.boton{
    margin: 10px 0;
    transition: 0.4s;
}
a:hover {
  background-color: #76c4f5; 
  color: black;
  border-radius: 10px 20px;
}
</style>