"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
// -------------------- Manejadores --------------------
const manejadorGenerico_1 = __importDefault(require("../../Controllers/manejadorGenerico"));
// -------------------- Modelos --------------------
const Vehiculo_1 = __importDefault(require("../../Models/Vehiculo/Vehiculo"));
const Cliente_1 = __importDefault(require("../../Models/Cliente"));
const Modelo_1 = __importDefault(require("../../Models/Vehiculo/Modelo"));
const Tipo_1 = __importDefault(require("../../Models/Vehiculo/Tipo"));
const Version_1 = __importDefault(require("../../Models/Vehiculo/Version"));
const Marca_1 = __importDefault(require("../../Models/Vehiculo/Marca"));
// -------------------- Rutas --------------------
router.get('/', manejadorGenerico_1.default({ modelo: Vehiculo_1.default, accion: manejadorGenerico_1.default.LEER }));
router.get('/:id', manejadorGenerico_1.default({ modelo: Vehiculo_1.default, accion: manejadorGenerico_1.default.LEER_POR_ID }));
// Obtiene la informacion de un auto con su informacion de Modelo, Tipo y Version
router.get('/:id/info', manejadorGenerico_1.default({
    modelo: Vehiculo_1.default,
    accion: manejadorGenerico_1.default.LEER_POR_ID,
    include: [
        {
            model: Modelo_1.default,
            attributes: ['nombre'],
            include: [{ model: Marca_1.default, attributes: ['nombre'] }]
        },
        {
            model: Tipo_1.default,
            attributes: ['nombre']
        },
        {
            model: Version_1.default,
            attributes: ['nombre']
        }
    ]
}));
router.get('/:id/cliente', manejadorGenerico_1.default({ modelo: Vehiculo_1.default,
    accion: manejadorGenerico_1.default.LEER_POR_ID,
    include: [{
            model: Cliente_1.default,
            attributes: ['nombre', 'apellido']
        }]
}));
router.post('/', manejadorGenerico_1.default({ modelo: Vehiculo_1.default, accion: manejadorGenerico_1.default.CREAR }));
router.put('/:id', manejadorGenerico_1.default({ modelo: Vehiculo_1.default, accion: manejadorGenerico_1.default.ACTUALIZAR_POR_ID }));
router.delete('/:id', manejadorGenerico_1.default({ modelo: Vehiculo_1.default, accion: manejadorGenerico_1.default.ELIMINAR_POR_ID }));
exports.default = router;
//# sourceMappingURL=Vehiculo.js.map