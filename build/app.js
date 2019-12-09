"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./Database/database"));
const body_parser_1 = require("body-parser");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = require("path");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
const app = express_1.default();
// -------------------- Importando rutas --------------------
const Cliente_1 = __importDefault(require("./Routes/Cliente"));
const Autenticacion_1 = __importDefault(require("./Routes/Autenticacion"));
const Usuario_1 = __importDefault(require("./Routes/Usuario/Usuario"));
const Rol_1 = __importDefault(require("./Routes/Usuario/Rol"));
const Permiso_1 = __importDefault(require("./Routes/Usuario/Permiso"));
const RolPermiso_1 = __importDefault(require("./Routes/Usuario/RolPermiso"));
const Main_1 = __importDefault(require("./Routes/DatosDePrueba/Main"));
const Categoria_1 = __importDefault(require("./Routes/Servicio/Categoria"));
const Servicio_1 = __importDefault(require("./Routes/Servicio/Servicio"));
const ClasificacionAuto_1 = __importDefault(require("./Routes/Vehiculo/ClasificacionAuto"));
const Vehiculo_1 = __importDefault(require("./Routes/Vehiculo/Vehiculo"));
const Herramienta_1 = __importDefault(require("./Routes/Inventario/Herramienta"));
const Categoria_2 = __importDefault(require("./Routes/Inventario/Categoria"));
const Insumo_1 = __importDefault(require("./Routes/Inventario/Insumo"));
const Ticket_1 = __importDefault(require("./Routes/Ticket/Ticket"));
const TicketServicio_1 = __importDefault(require("./Routes/Ticket/TicketServicio"));
const Cotizacion_1 = __importDefault(require("./Routes/Cotizacion/Cotizacion"));
const CotizacionServicio_1 = __importDefault(require("./Routes/Cotizacion/CotizacionServicio"));
// --------------------- Schemas ---------------------
const Schemas_1 = __importDefault(require("./Schemas/Schemas"));
Schemas_1.default();
// -------------------- Middlewares --------------------
app.use(cors_1.default());
app.use(cookie_parser_1.default());
app.use(body_parser_1.json());
// DELAY PARA SIMULAR RESPUESTA REMOTA
app.use('*', (req, res, next) => {
    setTimeout(() => {
        next();
    }, 0);
});
// -------------------- Rutas --------------------
app.use('/api/clientes', Cliente_1.default);
app.use('/api/auth', Autenticacion_1.default);
app.use('/api/usuarios', Usuario_1.default);
app.use('/api/roles', Rol_1.default);
app.use('/api/permisos', Permiso_1.default);
app.use('/api/rolpermiso', RolPermiso_1.default);
app.use('/api/datosdeprueba', Main_1.default);
app.use('/api/servicios/categorias', Categoria_1.default);
app.use('/api/servicios/', Servicio_1.default);
app.use('/api/vehiculos/', ClasificacionAuto_1.default); // Dentro de esta ruta esta /marca /modelo /version
app.use('/api/vehiculos', Vehiculo_1.default);
app.use('/api/herramienta', Herramienta_1.default);
app.use('/api/herramienta/categorias', Categoria_2.default);
app.use('/api/insumo', Insumo_1.default);
app.use('/api/tickets/', Ticket_1.default);
app.use('/api/ticketservicio/', TicketServicio_1.default);
app.use('/api/cotizacion', Cotizacion_1.default);
app.use('/api/cotizacionservicio/', CotizacionServicio_1.default);
app.use(express_1.default.static(path_1.join(__dirname, '../public')));
app.use('*', (req, res) => {
    res.sendFile(path_1.join(__dirname, '../public/index.html'));
});
// Para eliminar y crear la base de datos
//database.sync({force: true})
// -------------------- Verificar DB --------------------
database_1.default.authenticate()
    .then(() => console.log('Conectado a la base de datos'))
    .catch(error => console.log(error));
exports.default = app;
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
];
//# sourceMappingURL=app.js.map