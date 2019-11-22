<template>
    <div class="contenedor-tabla">
        
            <div  v-for="input of inputs" :key="input"  >
                <p>{{input.titulo}}</p>
                <div id="contenedor-input" >
                    <input  :placeholder="input.titulo" > 
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
        }
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