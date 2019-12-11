

<template >
    <div id="contenedor"  >
        <!--div class="flex" v-for="(opcion, index) of opciones" :key="index" >
            <div class="container mr-8" v-for="(unitario) of opcion" :key="unitario.value">
                
                <input :id="unitario.titulo + index" type="radio" name="grupo" :key="unitario.value" :value="unitario.value" :checked="unitario.value == seleccionado">
               
                <label @click="seleccion(unitario.value)" :for="unitario.titulo + index" >{{unitario.titulo}}</label>
            </div>

            
        </div-->

        <select  v-model="selected" @change="seleccion(selected)" required>
            <option  value="null" selected disabled hidden>Selecciona una opcion</option>
            <option  v-for="(select) of opciones" :value="select.value" :key="select.value">
                <h2>{{select.titulo}}</h2>
            </option>
            
        </select>
        
    </div>
</template>



<script>
export default {
    data: () => {
        return {
            selected: '',
           
        }
    },
    props: {
        seleccionado: String,
        opciones: Array,
    },
    methods: {
        seleccion: function(inputValue){
           
            this.$emit('seleccion', inputValue)
            //this.selected = this.seleccionado
        },
        reRender: function(){
            
            this.$forceUpdate()
        }
    },
    created() {
        this.selected = this.seleccionado
    },
    watch: {
        seleccionado: {
            immediate: true,
            handler: function(nuevo, viejo){
                console.log("HEY")
                this.selected = nuevo
            },
        }
    }
    

}
</script>



<style lang="scss" scoped>
#contenedor{
    
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
    select{
        border-radius: 5px;
        height: 30px;
        
        appearance: none;
        width: 100%; 
      
    }
}


@import 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css';
@import 'https://fonts.googleapis.com/css?family=Roboto+Mono:300,700';

</style>