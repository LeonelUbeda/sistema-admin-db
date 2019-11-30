<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th class="color-header-tabla" :key="titulo" v-for="titulo of titulos">{{titulo}}</th> <!-- Imprime los titulos que le pasas   -->
                </tr>
            </thead>
            <tbody>
                <tr v-for="(elemento, index) of secciones" :key="elemento.nombre">
                    <td>
                        {{elemento.nombre}}
                    </td>

                    <td v-for="(titulo, index2) of filterSection" :key="titulo">
                        <input type="radio" :id="elemento.nombre + index2" :name="elemento.nombre" :value="index2" v-model="inputs[elemento.nombre]" id="">
                        <div v-if="((nputs[elemento.nombre] > index2) && (index !== 0)) || (inputs[index2] == index2)" >SI</div>

                        <div v-else-if="inputs[elemento.nombre] == null">No</div>

                        <label :for="elemento.nombre + index2"></label>

                        
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>


<script>
export default {
    props: {
        secciones: Array,
        titulos: Array
    },
    data: () => {
        return {
            inputs: {}
        }
    },
    computed: {
        filterSection: function(){
            return this.titulos.filter(function(title){
                if(title !== 'Seccion'){
                    return title
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>


</style>