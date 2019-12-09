"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
// -------------------- Controladores --------------------
const manejadorGenerico_1 = __importDefault(require("../../Controllers/manejadorGenerico"));
// -------------------- Modelos --------------------
const CotizacionServicio_1 = __importDefault(require("../../Models/Cotizacion/CotizacionServicio"));
router.get('/', manejadorGenerico_1.default({ modelo: CotizacionServicio_1.default, accion: manejadorGenerico_1.default.LEER }));
router.post('/', manejadorGenerico_1.default({ modelo: CotizacionServicio_1.default, accion: manejadorGenerico_1.default.CREAR }));
router.put('/cotizacion/:cotizacionId/servicio/:servicioId', manejadorGenerico_1.default({ modelo: CotizacionServicio_1.default, accion: manejadorGenerico_1.default.ACTUALIZAR_POR_PARAMETROS }));
router.delete('/cotizacion/:cotizacionId/servicio/:servicioId', manejadorGenerico_1.default({ modelo: CotizacionServicio_1.default, accion: manejadorGenerico_1.default.ELIMINAR_POR_PARAMETROS }));
// Por si se quiere borrar todos los registros que conincidan con el rolId
router.delete('/cotizacion/:cotizacionId', manejadorGenerico_1.default({ modelo: CotizacionServicio_1.default, accion: manejadorGenerico_1.default.ELIMINAR_POR_PARAMETROS }));
// Lo mismo que arriba
router.delete('/servicio/:servicioId', manejadorGenerico_1.default({ modelo: CotizacionServicio_1.default, accion: manejadorGenerico_1.default.ELIMINAR_POR_PARAMETROS }));
exports.default = router;
//# sourceMappingURL=CotizacionServicio.js.map