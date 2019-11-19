<template>
    <div id="contenedor">
        <router-link to="/">
            <div>
                <span class="texto">Inicio</span>
            </div>
        </router-link>  
        <router-link to="/login">
            <div>
                <span class="texto">Login</span>
            </div>
        </router-link>
    </div>
</template>

<script>
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
    background-color: red;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.texto{
    color: white;
}

a{
    text-decoration: none;
}
</style>