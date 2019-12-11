<template>
    <div :class="[
    'flex flex-col bg-white elementos-seleccionados justify-center pl-8 mb-3', 
    {'borde-verde': !(elemento.precio === '' || typeof elemento.precio == 'undefined')} , 
    {'borde-rojo': elemento.precio === '' || typeof elemento.precio == 'undefined'}]">
        
        <div class="flex pt-3">
            <h2 class="mr-4">{{elemento.id}}</h2>
            <h2 class="text-lg">{{elemento.nombre}}</h2>
            <h2 class="cursor-pointer ml-auto mr-3 text-xl" @click="eliminarelementoSeleccionado(elemento)" style="color: red">X</h2>
        </div>
        <div class="divisor mt-3" style="margin-bottom: 5px"></div>
        <div class="flex mt-3 ">
            <div class="flex flex-col">
                <h2>Precio</h2>
                
                <input type="text" v-model="elemento.precio" class="input-default">
            </div>
            <div class="ml-3">
                <h2>Prioridad</h2>
                
                <select name="prioridad" id="prioridad" class="mt-3" v-model="elemento.prioridad" style="border: 1px #bbb solid; border-radius: 15px">
                    <option value="Alta">Alta</option>
                    <option value="Normal">Normal</option>
                    <option value="Baja">Baja</option>
                </select>
            </div>
            <div class="flex flex-col items-center">
                <h2>Terminado</h2>
                <input type="checkbox" v-model="elemento.terminado" class="mt-3">
            </div>
            <div v-show="false">{{elemento.detalleBoolean = false}}</div>
            <div class="flex flex-col items-center" >
                <div class="btn-azul-no-margin-pequeno my-4 ml-3" @click="toggle()">
                    Descripcion
                </div>
                
            </div>
        </div>
        <div class="flex items-center" v-if="descripcionSelect">
            <h2 class="mr-3">Descripcion</h2>
            <textarea cols="40" rows="5" v-model="elemento.descripcion" class="mt-3 input-default" style="width: 70%">
            </textarea>
        </div>
    </div>
</template>


<script>
export default {
    props: {
        elemento: Object
    },
    methods: {
        toggle(){
            this.descripcionSelect = !this.descripcionSelect
        },
        eliminarelementoSeleccionado(){
            console.log(this.elemento)
            this.$emit('eliminado', this.elemento)
        }
    },
    data: () => {
        return {
            descripcionSelect: false
        }
    }
}
</script>


<style scoped>

.borde-rojo{
    border: 0.5px tomato solid;
}

.borde-verde{
    border: 0.5px greenyellow solid;
}

input[type=text]{
    height: 25px !important;
    width: 150px ;
}
input[type=checkbox]{
    height: 20px !important;
    width: 50px
}
.servicios-seleccionados{
    width: 100%;
    height: auto;
    background-color: #7798AB;
    color: white;
    background-color: white;
    color: black
}
</style>