<template>
    <div class="contenedor-tabla">
        <div id="contenedor-inputs" v-for="(input, index) of inputs" :key="index">
            <div class="input" v-for="(unit, index2) of input" :key="index2">   
                <input :placeholder="unit.titulo">
            </div>                   
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
    data: () => {
        return {

        }
    }
}
</script>


<style lang="scss" scoped>

.input{
    margin: 10px 10px;
    width: 100%;
}

#contenedor-inputs{
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
    input{
        width: 100%;
    }
}
.contenedor-tabla{
    width: 100%;
}
</style>