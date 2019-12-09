"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
// -------------------- Manejadores --------------------
const manejadorGenerico_1 = __importDefault(require("../Controllers/manejadorGenerico"));
// -------------------- Modelos --------------------
const Cliente_1 = __importDefault(require("../Models/Cliente"));
const Telefono_1 = __importDefault(require("../Models/Telefono"));
const Vehiculo_1 = __importDefault(require("../Models/Vehiculo/Vehiculo"));
// -------------------- Rutas Clientes --------------------
router.get('/', manejadorGenerico_1.default({ modelo: Cliente_1.default, accion: manejadorGenerico_1.default.LEER }));
router.get('/:id', manejadorGenerico_1.default({ modelo: Cliente_1.default, accion: manejadorGenerico_1.default.LEER_POR_ID }));
router.post('/', manejadorGenerico_1.default({ modelo: Cliente_1.default, accion: manejadorGenerico_1.default.CREAR }));
router.put('/:id', manejadorGenerico_1.default({ modelo: Cliente_1.default, accion: manejadorGenerico_1.default.ACTUALIZAR_POR_ID }));
router.delete('/:id', manejadorGenerico_1.default({ modelo: Cliente_1.default, accion: manejadorGenerico_1.default.ELIMINAR_POR_ID }));
// -------------------- Rutas Telefono -------------------- 
//  Todos los telefonos de un cliente
router.get('/:clienteId/telefono', manejadorGenerico_1.default({ modelo: Telefono_1.default, accion: manejadorGenerico_1.default.LEER_PARAMETROS }));
// Busca un telefono sin especificar el id de usuario (por si se necesita en algun momento)
router.get('/telefono/:telefono', manejadorGenerico_1.default({ modelo: Telefono_1.default, accion: manejadorGenerico_1.default.LEER_PARAMETROS }));
router.get('/:clienteId/vehiculos', manejadorGenerico_1.default({ modelo: Vehiculo_1.default, accion: manejadorGenerico_1.default.LEER_PARAMETROS }));
// Crear nuevo telefono a un cliente
router.post('/:clienteId/telefono', manejadorGenerico_1.default({ modelo: Telefono_1.default, accion: manejadorGenerico_1.default.CREAR }));
// Edita un telefono que le pertenece a un cliente. 
// Cliente y telefono tienen que ser especificados en los parametros
router.put('/:clienteId/telefono/:telefono', manejadorGenerico_1.default({ modelo: Telefono_1.default, accion: manejadorGenerico_1.default.ACTUALIZAR_POR_PARAMETROS }));
// Borra un telefono que le pertenece a un cliente
// Cliente y telefono tienen que ser especificados en los parametros
router.delete('/:clienteId/telefono/:telefono', manejadorGenerico_1.default({ modelo: Telefono_1.default, accion: manejadorGenerico_1.default.ELIMINAR_POR_PARAMETROS }));
exports.default = router;
//# sourceMappingURL=Cliente.js.map