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
    margin: 10px 0
}
</style>