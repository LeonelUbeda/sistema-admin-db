
<template>
    <form id="contenedor-tabla" class="">
        <div :class="['bloque-titulo flex items-center margin-b-20 ', {'sombra': estilo === true}]" v-if="mostrarTitulo"  >
            <h2 class="ml-8 text-xl">{{nameForm}}</h2>
        </div>
        <div :class="['bg-white', 'padding-x-20', 'padding-y-10', {'sombra': estilo === true}]">
            
            <div  class="contenedor-input"  v-for="(input, index) of inputs" :key="index" >
                <div v-for="(unit, index2) of input" :key="index2" class="contenedor-filaprincipal" >
                    <div :class="[unit.uno == true ? 'contenedor-filauno': 'contenedor-fila']">

                           <p>{{unit.titulo}}</p>
                           
                            <select v-if="unit.opciones" v-model="datosAEnviar[unit.nombre]" id="" required>
                                <option  value="null" selected disabled hidden>Selecciona una opcion</option>
                                
                                <option v-for="(select, indexSelect) of unit.opciones" :value="select" :key="select">
                                    {{select}} : {{indexSelect}}
                                </option>
                                
                            </select>
                        
                            <input v-else 
                            v-model="datosAEnviar[unit.nombre]"
                            class="verde" 
                            :placeholder="unit.titulo" :type="unit.tipo"  :maxlength="unit.max"  min="1" :max="unit.max" 
                            required :disabled="unit.editable == false"> 
                            <button :hidden="unit.boton != true" @click="changeComponent('InputForanea')">
                                    Buscar
                            </button>
                            
                    </div>
                </div>                   
            </div>
            
            <div class="flex">
                <button @click="eventoBotonSecundario($event)" v-if="mostrarBotonSecundario">{{nombreBotonSecundario}}</button>
                <input type="submit" class="margin-left-auto ml-auto" @click="($event) => {modoCrear ?  crear($event) : actualizar($event) }" :value="nombreBoton" >
            </div>
        </div>
        
    </form> 
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import InputForanea from '../Components/InputForanea'
export default {
    props: {
        inputs: { type: Array, required: true  },
        estilo: {
            type: false,
            default: true
        },
        nameForm: String, //Nombre que sale en el titulo
        nombreBoton: String, //Nombre del boton de enviar
        // Mostrar boton secundario 
        mostrarBotonSecundario: {
            type: Boolean,
            default: false
        },
        // Texto del boton secundario
        nombreBotonSecundario: String,

        mostrarTitulo: Boolean,
        urlCrear: {
            type: String,
            default: '/api/clientes'
        },
        urlFinal:{
            type: String,
            default: 'undefined'
        },
        propiedadId: {
            type: String,
            default: ''
        },
        urlActualizar: {
            type: String, 
            default: '/api/clientes'
        },
        // Actualizar where id = 1
        propiedadActualizar: {
            type: String,
            default: 'id'
        },
        modoCrear: {
            type: Boolean, 
            default: true
        },
        
    },
    data: ()=>{
        return {
            datosAEnviar: {
            
            },
            datosAEnviarObligatorioBoolean: {}
        }
    },
    methods:{
        borrarInputsData: function() {
            console.log('INPUT DATAAA')
            this.datosAEnviar = {}
            
        },
        eventoBotonSecundario: function(event){
            event.preventDefault()
            this.$emit('clickBotonSecundario')
        },
        crear: function(event){
            let url = this.urlCrear
            if(this.urlFinal != 'undefined'){
                url += this.datosAEnviar[this.propiedadId] + this.urlFinal
            }
            event.preventDefault()
            try {
                this.verificarInputs()
                console.log('Posteando')
                axios.post(url, this.datosAEnviar)
                .then(response => {
                    Swal.fire({
                    icon: 'success',
                    title: 'Elemento añadido exitosamente',
                    })
                    this.$emit('elementoCreado')
                })
                .catch(e => {
                    Swal.fire({
                    icon: 'error',
                    title: 'fuachaval',
                    text: 'Verifique sus datos e intentelo de nuevo',
                    })
                    
                })
            } catch (error) {
                Swal.fire({
                icon: 'error',
                title: 'Faltan datos!',
                text: 'Verifique sus datos e intentelo de nuevo'
                })
            }

        },
        
        actualizar(event){
            event.preventDefault()
            console.log(this.datosAEnviar)
            try { 
                this.verificarInputs()
                let url = this.urlActualizar + '/' + this.datosAEnviar[this.propiedadActualizar]
                console.log(url)
                axios.put(url,  this.datosAEnviar)
                .then(response => {
                    Swal.fire({
                    icon: 'success',
                    title: 'Elemento añadido exitosamente',
                    })
                    this.$emit('elementoActualizado')
                })
                .catch(e => {
                    Swal.fire({
                    icon: 'error',
                    title: 'Error de servidor',
                    text: 'Verifique sus datos e intentelo de nuevo',
                    })
                    
                })
                
            } catch (error) {
                Swal.fire({
                icon: 'error',
                title: error,
                text: 'Verifique sus datos e intentelo de nuevo',
                })
            }
        },
        verificarInputs: function(){
            
            console.log(this.datosAEnviar, this.datosAEnviarObligatorioBoolean)
           /* for(let propiedad in this.datosAEnviar){
                if(typeof this.datosAEnviar[propiedad] != 'undefined'){
                    
                    if(this.datosAEnviar[propiedad] <= 1 && this.datosAEnviarObligatorioBoolean[propiedad] === true){
                        throw "Falta inputs"
                    }
                }
                /*if(this.datosAEnviar[propiedad] <= 1){
                    //throw "Falta inputs"
                    console.log("HE")
                }
            }s
            
            /*
            for(let inputs of this.inputs){
                for(let input of inputs){
                    if(this.datosAEnviar[input.nombre].length <= 1){
                        
                    }
                }
            }      */     
           
            
        },
        // Esto es para asignar los valores de cada input de config.inputs[0][0] a
        // su correspondiente propiedad en datosAEnviar
        ValueIgualVModel: function(){
            this.inputs.forEach((elemento) => {
                elemento.forEach((elemento2) => {
                    
                    this.datosAEnviar[elemento2.nombre] = typeof elemento2.valor == 'undefined' ? null : elemento2.valor
                    this.datosAEnviarObligatorioBoolean[elemento2.nombre] = (typeof elemento2.obligatorio == 'undefined') ? false : elemento2.obligatorio 
                    //this.datosAEnviar[elemento2.nombre] = typeof elemento2.valor == 'undefined' ? '' : elemento2.valor
                    //this.datosAEnviar[elemento2.nombre] = typeof elemento2.valor == 'undefined' ? '' : elemento2.valor
                    //this.datosAEnviar[elemento2.nombre] = null
                })
            });
            

        },
        changeComponent(component) {
this.currentComp === component
}
    },
    beforeMount(){

        },
    created(){
        this.ValueIgualVModel()
    },
     components:{
        InputForanea
    }
}
</script>


<style lang="scss"  scoped>
#contenedor-tabla{
    width: 100%;
    
}
.contenedor-filauno{
    width: 50%;
}
.contenedor-fila{
    width: 100%;
}
.contenedor-filaprincipal{
    width: 100%;
    margin: 5px 10px;
}
.contenedor-input{
    margin-top: 10px;
    display: flex;
    input{
        width: 100%;
    }

}
.verde{
    padding-top: 5px;
    outline: 0;
    height: 60%;
}
.verde:focus{
    padding-top: 5px;
    border: 1px solid green;
    height: 60%;
}
.rojo{
    padding-top: 5px;
    height: 60%;
    outline: 0;
    border: solid red;
}
.rojo:focus{
    padding-top: 5px;
    border: solid red;
    height: 60%;
}



.inputUnit{
    margin: 5px;   
    border-radius: 4px;
    height: 25px;
    border: solid rgb(79, 70, 105);
}

input[type="number"]::-webkit-outer-spin-button, input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
  
}

input[type=submit]{
    background:#398AD7;
    padding:10px 30px;  
    color: white;
    width: auto;
    border: 0;
    margin-left: auto;
    cursor: pointer;
    &:hover{
        background:rgb(71, 165, 253);
    }
}


input, select {
	margin:10px 0 15px 0;
	padding:5px 10px;
	width:100%;
	outline:none;
	border:1px solid #bbb;
	border-radius:20px;
	display:inline-block;
	-webkit-box-sizing:border-box;
	   -moz-box-sizing:border-box;
	        box-sizing:border-box;
    -webkit-transition:0.2s ease all;
	   -moz-transition:0.2s ease all;
	    -ms-transition:0.2s ease all;
	     -o-transition:0.2s ease all;
	        transition:0.2s ease all;
}
</style>