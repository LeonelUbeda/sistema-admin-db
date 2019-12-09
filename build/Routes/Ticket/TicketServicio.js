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
const TicketServicio_1 = __importDefault(require("../../Models/Ticket/TicketServicio"));
router.get('/', manejadorGenerico_1.default({ modelo: TicketServicio_1.default, accion: manejadorGenerico_1.default.LEER }));
router.post('/', manejadorGenerico_1.default({ modelo: TicketServicio_1.default, accion: manejadorGenerico_1.default.CREAR }));
// api/ticketservicio/ticket/2/servicio/6
router.put('/ticket/:ticketId/servcio/:ticketId', manejadorGenerico_1.default({ modelo: TicketServicio_1.default, accion: manejadorGenerico_1.default.ACTUALIZAR_POR_PARAMETROS }));
router.delete('/ticket/:ticetId/servicio/:ticketId', manejadorGenerico_1.default({ modelo: TicketServicio_1.default, accion: manejadorGenerico_1.default.ELIMINAR_POR_PARAMETROS }));
// api/ticketservicio/ticket/2
// Por si se quiere borrar todos los registros que conincidan con el rolId
router.delete('/ticket/:ticketId', manejadorGenerico_1.default({ modelo: TicketServicio_1.default, accion: manejadorGenerico_1.default.ELIMINAR_POR_PARAMETROS }));
// api/ticketservicio/servicio/6
// Lo mismo que arriba
router.delete('/servicio/:servicioId', manejadorGenerico_1.default({ modelo: TicketServicio_1.default, accion: manejadorGenerico_1.default.ELIMINAR_POR_PARAMETROS }));
exports.default = router;
//# sourceMappingURL=TicketServicio.js.map