
<template>

<div id="contenedor">
    <TopSection 
    :opciones="opciones"
    :opcionSeleccionada="opcionSeleccionada"
    @elementoSeleccionado="clickOpciones">
    </TopSection>

    <div id="main">
        <h2>Clientes</h2>
        <h1 v-show="opcionSeleccionada === 'Crear'">CREAR CLIENTES</h1>
        <br><br>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem excepturi, debitis ex quis quisquam ea suscipit minima unde! Reprehenderit rem corrupti non, voluptates quo maxime suscipit sit doloribus! Iste, quisquam?
        <br><br><br><br><br>
    </div>
</div>

</template>



<script>
import TopSection from '../Components/TopSection'
export default {
    data: () => {
        return {
            opciones: ['Crear','Buscar','Actualizar'],
            opcionSeleccionada: 'Buscar'
        }
    },
    components:{
        TopSection
    },
    methods: {
        clickOpciones: function (dato){
            
            this.opcionSeleccionada = dato
        }
    }
}
</script>



<style lang="scss" scoped>
#main{
    padding: 20px 20px
}
</style>