
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
        <table :class="[{'sombra-tabla': sombra}]">
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

    /* 
    Consejo: 
    Antes, necesitaran saber como está estructurada la respuesta del servidor y sus respectivas
    relaciones, asi que intenten hacer un GET simple en la direccion correspondiente de la api. 
    La direccion de este ejemplo es /api/vehiculos/versiones


    Supongamos que el prop elementos tiene esto 
    [
        {
            id: 1,
            modeloId: 1,
            nombre: "Deportiva",
            modelo: {
                id: 1,
                marcaId: 1,
                nombre: "Corolla"
            }
        },
        {
            id: 2,
            modeloId: 1,
            nombre: "Campera",
            modelo: {
                id: 1,
                marcaId: 1,
                nombre: "Corolla"
            }
        }
    ]
    Supongamos que el prop tablaTitulos tiene esta estructura

    tablaTitulos: [
        {propiedad: 'id', titulo: 'Identificador'}, 
        {propiedad: 'nombre', titulo: 'Nombre'},
        {propiedad: 'NombreModeloForaneo', titulo: 'Modelo', foranea: {
            propiedadRelacion: 'modelo', 
            propiedadMostrar: 'nombre'
        }}   
    ]

    Lo que va a suceder es que el componente va a inyectar la propiedad NombreModeloForaneo
    en cada elemento de 'elementos' con el valor de [propiedadrelacion][propiedadMostrar] 
    o que es lo mismo modelo.nombre

    Para que el componente haga todo esto, el titulo debe de tener la propiedad foranea con su 
    respectiva configuracion.

    Otra cosa a mencionar, es que esto no modifica el funcionamiento de inputForanea, debido a que no se modifica la
    propiedad del id foraneo. Por lo tanto, en este ejemplo, todavia existe la propiedad modeloId que es la que
    utiliza el componente InputTemplate para pasarlo a InputForanea

    */

    data: () => {
        return{
            noELementos: false
        }
    },
    props: {
        elementos: Array,
        titulos: Array,
        sombra: {
            type: Boolean,
            default: true
        },
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
    watch:{
        elementos: function(nuevo, antiguo){
            for(let titulo of this.titulos){
                if(typeof titulo.foranea !== 'undefined'){
                    for(let elemento of nuevo){
                        if(elemento[titulo.foranea.propiedadRelacion] !== null){
                            // Si el titulo tiene dentro de foranea, una propiedad foranea, entonces...
                            if(!titulo.foranea.hasOwnProperty('foranea')){
                                elemento[titulo.propiedad] = elemento[titulo.foranea.propiedadRelacion][titulo.foranea.propiedadMostrar]
                            }else{ 
                                if(elemento[titulo.foranea.propiedadRelacion][titulo.foranea.foranea.propiedadRelacion] !== null){
                                    // WTF IM DOING WITH MY LIFE
                                    elemento[titulo.foranea.foranea.propiedad] = elemento[titulo.foranea.propiedadRelacion][titulo.foranea.foranea.propiedadRelacion][titulo.foranea.foranea.propiedadMostrar]
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    updated(){
       
        /*for(let elemento of this.elementos){
            if(elemento.Rol !== null){
                elemento.rolId = elemento.Rol.nombre
            }
        }*/
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
.sombra-tabla{
    border: 0;
    -webkit-box-shadow: 10px 14px 63px -49px rgba(0,0,0,0.75);
    -moz-box-shadow: 10px 14px 63px -49px rgba(0,0,0,0.75);
    box-shadow: 10px 14px 63px -49px rgba(0,0,0,0.75);
}

table{
    border-radius: 8px;
    border: 1px solid gray;
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