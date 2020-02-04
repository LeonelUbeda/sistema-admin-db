import dotenv from 'dotenv'
dotenv.config()
import express from "express"
import database from './Database/database';
import {json} from 'body-parser'
import {join} from 'path'
import verificarLogin from './Middlewares/verificarLogin'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express();







// -------------------- Importando rutas --------------------

import RutaCliente from './Routes/Cliente'
import RutaAutenticacion from './Routes/Autenticacion'
import RutaUsuario from './Routes/Usuario/Usuario'
import RutaRol from './Routes/Usuario/Rol'
import RutaPermiso from './Routes/Usuario/Permiso'
import RutaRolPermiso from './Routes/Usuario/RolPermiso'

import RutaCategoriaServicio from './Routes/Servicio/Categoria'
import RutaServicio from './Routes/Servicio/Servicio'
import RutaClasificacionVehiculo from './Routes/Vehiculo/ClasificacionAuto'
import RutaVehiculo from './Routes/Vehiculo/Vehiculo'
//import RutaHerramienta from './Routes/Inventario/Herramienta'
//import RutaCategoriaHerramienta from './Routes/Inventario/Categoria'
//import RutaInsumo from './Routes/Inventario/Insumo'
import RutaTicket from './Routes/Ticket/Ticket'
import RutaTicketServicio from './Routes/Ticket/TicketServicio'
//import RutaRegistro from './Routes/Registro/Registro'
// import RutaCotizacion from './Routes/Cotizacion/Cotizacion'
// import RutaCotizacionServicio from './Routes/Cotizacion/CotizacionServicio'
import './Models/Registro/Registro'
import './Models/Registro/RegistroDetalle'


// --------------------- Schemas ---------------------
import CreateSchemas from './Schemas/Schemas'
CreateSchemas()


// -------------------- Middlewares --------------------
app.use(cors())
app.use(cookieParser())
app.use(json())


// DELAY PARA SIMULAR RESPUESTA REMOTA
app.use('*', (req, res, next) => {
    setTimeout(() => {
        next()
    }, 0)
})

// -------------------- Rutas --------------------
app.use('/api/clientes',        RutaCliente)
app.use('/api/auth',            RutaAutenticacion)
app.use('/api/usuarios',        RutaUsuario )
app.use('/api/roles',           RutaRol)
app.use('/api/permisos',        RutaPermiso)
app.use('/api/rolpermiso',      RutaRolPermiso)
app.use('/api/servicios/categorias',    RutaCategoriaServicio)
app.use('/api/servicios/',              RutaServicio)
app.use('/api/vehiculos/',              RutaClasificacionVehiculo) // Dentro de esta ruta esta /marca /modelo /version
app.use('/api/vehiculos',               RutaVehiculo)
//app.use('/api/herramienta',             RutaHerramienta)
//app.use('/api/herramienta/categorias',  RutaCategoriaHerramienta)
//app.use('/api/insumo',                  RutaInsumo)
app.use('/api/ticketservicio/',         RutaTicketServicio)
app.use('/api/tickets/',                RutaTicket)
//app.use('/api/registros/',              RutaRegistro)
// app.use('/api/cotizacion',              RutaCotizacion)
// app.use('/api/cotizacionservicio/',     RutaCotizacionServicio)

app.use(express.static(join(__dirname, '../public')))

app.use('*', (req, res) => {
    res.sendFile(join(__dirname, '../public/index.html'))
})


// ----------- Vistas / Procedimientos -----------------------
import createViews from "./Views/createViews";
import createStoredProcedures from "./StoredProcedures/createStoredProcedures"
import createTriggers from "./Trigger/createTriggers"

// Para eliminar y crear la base de datos
/*database.sync({force: false}).then( async () => {
    if(database.getDialect() == 'mssql') {
        await createViews()
        await createStoredProcedures()
        await createTriggers()
    }
})
*/

// -------------------- Verificar DB --------------------
database.authenticate()
.then(() => console.log('Conectado a la base de datos'))
.catch(error => console.log(error))


export default app;

