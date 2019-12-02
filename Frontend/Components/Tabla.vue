
<!--
    Este componente recibe como propiedad dos cosas:

    1- elementos: Un arreglo de objetos a renderizar. Solo se van a renderizar las propiedades
    que hagan match con la propiedad 'propiedad' del arreglo de objetos 'titulos'.

    2- titulos: Un arreglo de objetos con dos propiedades:
            a) propiedad: El nombre de una propiedad de un objeto de 'elementos'
            b) titulo: El titulo correspondiente a la propiedad

    Ejemplo: 
        elementos: [
            {nombre: 'Juan', apellido: 'sanchez', direccion: 'Casita'}
        ]

        titulos: [
            {propiedad: 'nombre', titulo: 'Nombre de cliente'},
            {propiedad: 'apellido', titulo: 'Apelldio del cliente'}
        ]

        como no hay ningun objeto para la propiedad direccion en 'titulos' entonces no se va a renderizar en la tabla
-->

<template>
    <div id="contenedor">
        <div id="paginacion">
            <h4 @click="atras">Atras</h4>
            <h4 @click="siguiente">Siguiente</h4>
        </div>
        <table>
            <caption></caption>
            <thead>
                <tr>
                    <th class="color-header-tabla" v-for="titulo of titulos" :key="titulo.propiedad">{{titulo.titulo}}</th>
                </tr>
            </thead>  
           
            <tbody>
                <tr :key="index" v-for="(elemento, index) of elementos" @click="enviarInformacionFila(elemento)">
                    <td :key="titulo.propiedad" v-for="titulo in titulos">{{elemento[titulo.propiedad]}}</td>
                </tr>
                
            </tbody>
            
            
        </table>
        <div class="mensaje-rojo" v-if="noELementos">  
            <h2>No hay elementos!</h2>
        </div>
    </div>
</template>

<script>

export default {
    data: () => {
        return{
            noELementos: false
        }
    },
    props: {
        elementos: Array,
        titulos: Array,
        paginacion: {
            type: Object, 
            required: false
        }
    },
    methods:{
        enviarInformacionFila(elemento){
            this.$emit('filaSeleccionada', elemento)
        },
        atras: function(){
            this.$emit('atras')
        },
        siguiente: function(){
            this.$emit('siguiente')
        }
    },
    updated(){
        this.noELementos = this.elementos.length == 0 ? true : false
    }
}
</script>

<style lang="scss" scoped>
#paginacion{
    display: flex;

}
#contenedor{
    width: 100%;
    
}
caption{
    color: white;
    font-size: 1.5em;
}

table{
    -webkit-box-shadow: 10px 14px 63px -49px rgba(0,0,0,0.75);
    -moz-box-shadow: 10px 14px 63px -49px rgba(0,0,0,0.75);
    box-shadow: 10px 14px 63px -49px rgba(0,0,0,0.75);
    border-collapse: collapse;
    width: 100%;
    
    td,th{
        height: 50px;
        padding: 8px;
        text-align: start;
    }
    tr{
        margin-left: 50px!important;
    }

    th{ // El head de la tabla
        background-color: #6c7ae0;
        color:#dedfe0;
        color:white;
    }

    td{
        font-weight: 300 !important;
        border-left: 0;
        border-right: 0;
        cursor: pointer;

        
    }
    thead{
        border-radius: 20px;
    }
    tbody{
        overflow:scroll;
        height:100px !important;
        tr{
            background-color: #F8F6FF;
        }
        tr:nth-child(even){
            background-color: #FFFFFF;
        }
    }


}

#scrollbar{
    overflow:scroll;
    height:100px !important;
}

</style>