<template>
    <div id="contenedor" >
        <!--div class="flex" v-for="(opcion, index) of opciones" :key="index" >
            <div class="container mr-8" v-for="(unitario) of opcion" :key="unitario.value">
                
                <input :id="unitario.titulo + index" type="radio" name="grupo" :key="unitario.value" :value="unitario.value" :checked="unitario.value == seleccionado">
               
                <label @click="seleccion(unitario.value)" :for="unitario.titulo + index" >{{unitario.titulo}}</label>
            </div>

            
        </div-->

        <select  v-model="selected" @change="seleccion(selected)" required>
            <option  value="null" selected disabled hidden>Selecciona una opcion</option>
            <option  v-for="(select) of opciones" :value="select.value" :key="select.value">
                {{select.titulo}}
            </option>
            
        </select>
    </div>
</template>



</form>
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
            console.log(inputValue)
            this.$emit('seleccion', inputValue)
            //this.selected = this.seleccionado
        },
        reRender: function(){
            console.log(this.seleccionado)
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
    input{

    }
}
[type="radio"]:checked,
[type="radio"]:not(:checked) {
    position: absolute;
    left: -9999px;
}
[type="radio"]:checked + label,
[type="radio"]:not(:checked) + label
{
    position: relative;
    padding-left: 28px;
    cursor: pointer;
    line-height: 20px;
    display: inline-block;
    color: #666;
}
[type="radio"]:checked + label:before,
[type="radio"]:not(:checked) + label:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 20px;
    height: 20px;
    border: 1px solid #ddd;
    border-radius: 100%;
    background: #fff;
}
[type="radio"]:checked + label:after,
[type="radio"]:not(:checked) + label:after {
    content: '';
    width: 12px;
    height: 12px;
    background: #F87DA9;
    position: absolute;
    top: 4px;
    left: 4px;
    border-radius: 100%;
    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;
}
[type="radio"]:not(:checked) + label:after {
    opacity: 0;
    -webkit-transform: scale(0);
    transform: scale(0);
}
[type="radio"]:checked + label:after {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
}
</style>