<!-- 
    Este componente recibe como propiedades 2 elementos. 
    1- opcion, que es el arreglo de opciones para el CRUD (o cualquier tipo de opción realmente).
    2- opcionSeleccionada, es (obviamente) la opción seleccionada. 
    
    Al dar click en una de las opciones se emite el evento elementoSeleccionado en el cual 
    se manda la opción seleccionada.
    
    El componente padre se debe de encargar de obtener el valor del evento y almacenarlo en la variable de la propiedad
    opcionSeleccionada para que se actualice visualmente este componente


    Para cambiar el fondo, color de fuente, color de border inferior de boton seleccionado... cambiar los estilos en themeColors.css


-->


<template>
    <div id="contenedor" class="colorPrincipal">
        <div id="opciones">
            <div v-for="opcion of opciones"
            :key="opcion" 
            :class="{ bordeSeleccionado: opcion === opcionSeleccionada}" 
            v-on:click="botonClick(opcion)">
                {{opcion}}
            </div>

        </div>
    </div>
</template>


<script>
//CSS
import themeColorsCSS from '../assets/css/themeColors.css'



export default {
    props:{
        opciones: {
            type: Array,
            required: true
        },
        opcionSeleccionada: {
            type: String,
            required: true
        }
    },
    data: () => {
        return {

        }
    },
    methods:{
        botonClick: function (elementoSeleccionado) {
            //console.log(elementoSeleccionado)
            this.$emit("elementoSeleccionado", elementoSeleccionado);
        }
    }
}
</script>



<style lang="scss" scoped>
#contenedor{
    width: 100%;
    height: 50px;
    border-bottom: 0.5px solid #f8f8f8;
    box-shadow: 0 1px 20px -2px #dbdbdb;
}

#opciones{
    display: flex;
    cursor: pointer;
    align-items: center;
    height: 100%;
    > div {
        margin: 0 20px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 50px;
        
    }
}
</style>