"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
// -------------------- Controladores --------------------
const manejadorGenerico_1 = __importDefault(require("../../Controllers/manejadorGenerico"));
const Cotizacion_1 = __importDefault(require("../../Models/Cotizacion/Cotizacion"));
const Servicio_1 = __importDefault(require("../../Models/Servicio/Servicio"));
router.get('/', manejadorGenerico_1.default({ modelo: Cotizacion_1.default, accion: manejadorGenerico_1.default.LEER }));
router.get('/:id', manejadorGenerico_1.default({ modelo: Cotizacion_1.default, accion: manejadorGenerico_1.default.LEER_POR_ID }));
router.post('/', manejadorGenerico_1.default({ modelo: Cotizacion_1.default, accion: manejadorGenerico_1.default.CREAR }));
router.put('/:id', manejadorGenerico_1.default({ modelo: Cotizacion_1.default, accion: manejadorGenerico_1.default.ACTUALIZAR_POR_ID }));
router.delete('/:id', manejadorGenerico_1.default({ modelo: Cotizacion_1.default, accion: manejadorGenerico_1.default.ELIMINAR_POR_ID }));
router.get('/:id/servicios', manejadorGenerico_1.default({
    modelo: Cotizacion_1.default,
    accion: manejadorGenerico_1.default.LEER_PARAMETROS,
    include: [{
            model: Servicio_1.default,
            through: { attributes: ['precio'] }
        }]
}));
exports.default = router;
//# sourceMappingURL=Cotizacion.js.map