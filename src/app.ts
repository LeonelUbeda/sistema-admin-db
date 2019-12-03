import express from "express"
import database from './Database/database';
import {json} from 'body-parser'
import dotenv from 'dotenv'
import {join} from 'path'
import verificarLogin from './Middlewares/verificarLogin'
import cors from 'cors'
dotenv.config()
const app = express();







// -------------------- Importando rutas --------------------

import RutaCliente from './Routes/Cliente'
import RutaAutenticacion from './Routes/Autenticacion'
import RutaUsuario from './Routes/Usuario/Usuario'
import RutaRol from './Routes/Usuario/Rol'
import RutaPermiso from './Routes/Usuario/Permiso'
import RutaRolPermiso from './Routes/Usuario/RolPermiso'
import RutaDatosDePrueba from './Routes/DatosDePrueba/Main'
import RutaCategoriaServicio from './Routes/Servicio/Categoria'
import RutaServicio from './Routes/Servicio/Servicio'
import RutaClasificacionVehiculo from './Routes/Vehiculo/ClasificacionAuto'
import RutaVehiculo from './Routes/Vehiculo/Vehiculo'
import RutaHerramienta from './Routes/Inventario/Herramienta'
import RutaCategoriaHerramienta from './Routes/Inventario/Categoria'
import RutaInsumo from './Routes/Inventario/Insumo'
// -------------------- Midlewares --------------------
app.use(cors())
app.use(json())
/*
app.use('*', (req, res, next) => {
    setTimeout(() => {
        next()
    }, 1000)
})
*/
// -------------------- Rutas --------------------
app.use('/api/clientes',        RutaCliente)
app.use('/api/auth',            RutaAutenticacion)
app.use('/api/usuarios',        RutaUsuario )
app.use('/api/roles',           RutaRol)
app.use('/api/permisos',        RutaPermiso)
app.use('/api/rolpermiso',      RutaRolPermiso)
app.use('/api/datosdeprueba',   RutaDatosDePrueba)
app.use('/api/servicios/',              RutaServicio)
app.use('/api/servicios/categorias',    RutaCategoriaServicio)
app.use('/api/vehiculos/',              RutaClasificacionVehiculo) // Dentro de esta ruta esta /marca /modelo /version
app.use('/api/vehiculos',               RutaVehiculo)
app.use('/api/herramienta',             RutaHerramienta)
app.use('/api/herramienta/categorias',  RutaCategoriaHerramienta)
app.use('/api/insumo',                  RutaInsumo)

app.use(express.static(join(__dirname, '../public')))

app.use('*', (req, res) => {
    res.sendFile(join(__dirname, '../public/index.html'))
})



<<<<<<< HEAD
// Para eliminar y crear la base de datos
database.sync(/*{force: true}*/)
=======
//Para eliminar y crear la base de datos
//database.sync({force: true})
>>>>>>> c0bdc8a1acd76ed698ef0d0ea1eb2a27700ebf7e

// -------------------- Verificar DB --------------------
database.authenticate()
.then(() => console.log('Conectado a la base de datos'))
.catch(error => console.log(error))


export default app;


let inputs = [
    {
        name: 'nombre',
        titulo: 'Nombre del cliente',
        restriccion: {
            type: String,
            length: 10,
            required: true
        },
        foreign: {
            url: '/api/clientes',
            displayProp: 'Nombre',
            nameProp: 'id'
        }
    },
    {
        name: 'Edad',
        titulo: 'Edad del cliente',
        restriccion: {
            type: Number,
            length: 2,
            required: false
        }
    },
]