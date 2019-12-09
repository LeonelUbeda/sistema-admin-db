"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const Ticket_1 = __importDefault(require("../../Models/Ticket/Ticket"));
const RepuestoCliente_1 = __importDefault(require("../../Models/Ticket/RepuestoCliente"));
const manejadorGenerico_1 = __importDefault(require("../../Controllers/manejadorGenerico"));
const Nota_1 = __importDefault(require("../../Models/Ticket/Nota"));
// Ruta generica para buscar tickets
router.get('/', manejadorGenerico_1.default({ modelo: Ticket_1.default, accion: manejadorGenerico_1.default.LEER }));
router.get('/:id', manejadorGenerico_1.default({ modelo: Ticket_1.default, accion: manejadorGenerico_1.default.LEER_POR_ID }));
router.post('/', manejadorGenerico_1.default({ modelo: Ticket_1.default, accion: manejadorGenerico_1.default.CREAR }));
router.put('/:id', manejadorGenerico_1.default({ modelo: Ticket_1.default, accion: manejadorGenerico_1.default.ACTUALIZAR_POR_ID }));
router.delete('/:id', manejadorGenerico_1.default({ modelo: Ticket_1.default, accion: manejadorGenerico_1.default.ELIMINAR_POR_ID }));
router.get('/repuesto/', manejadorGenerico_1.default({ modelo: RepuestoCliente_1.default, accion: manejadorGenerico_1.default.LEER }));
router.get('/repuesto/:id', manejadorGenerico_1.default({ modelo: RepuestoCliente_1.default, accion: manejadorGenerico_1.default.LEER_POR_ID }));
router.post('/repuesto/', manejadorGenerico_1.default({ modelo: RepuestoCliente_1.default, accion: manejadorGenerico_1.default.CREAR }));
router.put('/repuesto/:id', manejadorGenerico_1.default({ modelo: RepuestoCliente_1.default, accion: manejadorGenerico_1.default.ACTUALIZAR_POR_ID }));
router.delete('/repuesto/:id', manejadorGenerico_1.default({ modelo: RepuestoCliente_1.default, accion: manejadorGenerico_1.default.ELIMINAR_POR_ID }));
router.get('/:ticketId/repuestos', manejadorGenerico_1.default({ modelo: RepuestoCliente_1.default, accion: manejadorGenerico_1.default.LEER_PARAMETROS }));
router.post('/:ticketId/repuestos', manejadorGenerico_1.default({ modelo: RepuestoCliente_1.default, accion: manejadorGenerico_1.default.CREAR }));
router.delete('/:ticketId/respuestos', manejadorGenerico_1.default({ modelo: RepuestoCliente_1.default, accion: manejadorGenerico_1.default.ELIMINAR_POR_PARAMETROS }));
router.get('/notas/', manejadorGenerico_1.default({ modelo: Nota_1.default, accion: manejadorGenerico_1.default.LEER }));
router.get('/notas/:id', manejadorGenerico_1.default({ modelo: Nota_1.default, accion: manejadorGenerico_1.default.LEER_POR_ID }));
router.post('/notas/', manejadorGenerico_1.default({ modelo: Nota_1.default, accion: manejadorGenerico_1.default.CREAR }));
router.put('/notas/:id', manejadorGenerico_1.default({ modelo: Nota_1.default, accion: manejadorGenerico_1.default.ACTUALIZAR_POR_ID }));
router.delete('/notas/:id', manejadorGenerico_1.default({ modelo: Nota_1.default, accion: manejadorGenerico_1.default.ELIMINAR_POR_ID }));
router.get('/:ticketId/notas', manejadorGenerico_1.default({ modelo: RepuestoCliente_1.default, accion: manejadorGenerico_1.default.LEER_PARAMETROS }));
router.post('/:ticketId/notas', manejadorGenerico_1.default({ modelo: RepuestoCliente_1.default, accion: manejadorGenerico_1.default.CREAR }));
router.delete('/:ticketId/notas', manejadorGenerico_1.default({ modelo: RepuestoCliente_1.default, accion: manejadorGenerico_1.default.ELIMINAR_POR_PARAMETROS }));
exports.default = router;
//# sourceMappingURL=Ticket.js.map