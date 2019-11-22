<template>
    <div class="contenedor-tabla">
            <h2>{{nameForm}}</h2>
            <div  id="contenedor-input"  v-for="input of inputs" :key="input"  >
                <div class="contenedor-fila" v-for="unit of input" :key="unit">
                    <input  :placeholder="unit.titulo" :type="unit.type" :maxlength="unit.length" > 
                </div>                   
            </div>
        
        <div>
            <br>
            <input type="submit" value="Enviar">
        </div>
    </div> 
</template>

<script>
export default {
    props: {
        inputs: {
           type: Array, 
           required: true  
        },
        nameForm: String
    },
    data: ()=>{
           
    }
}
</script>


<style scoped>
#contenedor-input{
    display: flex;
    flex-wrap: nowrap;
}
.contenedor-tabla{
    
}
</style>