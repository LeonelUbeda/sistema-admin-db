"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const manejadorGenerico_1 = __importDefault(require("../../Controllers/manejadorGenerico"));
// -------------------- Controladores --------------------
const herramienta_controller_1 = require("../../Controllers/Inventario/herramienta.controller");
const Herramienta_1 = require("../../Models/Inventario/Herramienta");
// -------------------- Rutas Herramienta --------------------
router.get('/', manejadorGenerico_1.default({ modelo: Herramienta_1.Herramienta, accion: manejadorGenerico_1.default.LEER }));
router.get('/movimiento/', manejadorGenerico_1.default({ modelo: Herramienta_1.MovimientoHerramienta, accion: manejadorGenerico_1.default.LEER }));
router.get('/:id', manejadorGenerico_1.default({ modelo: Herramienta_1.Herramienta, accion: manejadorGenerico_1.default.LEER_POR_ID }));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const elemento = req.body;
    const elementoMovimiento = { tipo: "entrada",
        razon: elemento.hasOwnProperty("razon") ? elemento.razon : "Ingreso inicial",
        usuario: elemento.usuario,
        cantidad: elemento.cantidad };
    try {
        const respuesta = yield herramienta_controller_1.herramientaNuevo(elemento, elementoMovimiento);
        res.status(201).json(respuesta);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ mensaje: 'Error' });
    }
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const elemento = req.body;
    try {
        const respuesta = yield herramienta_controller_1.herramientaActualizar(elemento, { id }, ["cantidad"]);
        res.status(201).json(respuesta);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ mensaje: 'Error' });
    }
}));
router.delete('/:id', manejadorGenerico_1.default({ modelo: Herramienta_1.Herramienta, accion: manejadorGenerico_1.default.ELIMINAR_POR_ID }));
router.get('/:id/movimiento', manejadorGenerico_1.default({
    modelo: Herramienta_1.Herramienta,
    accion: manejadorGenerico_1.default.LEER_POR_ID,
    include: [{
            model: Herramienta_1.MovimientoHerramienta
        }]
}));
exports.default = router;
//# sourceMappingURL=Herramienta.js.map