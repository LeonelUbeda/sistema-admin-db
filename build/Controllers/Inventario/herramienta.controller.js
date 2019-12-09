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
Object.defineProperty(exports, "__esModule", { value: true });
const genericos_controller_1 = require("../genericos.controller");
const Herramienta_1 = require("../../Models/Inventario/Herramienta");
const Insumo_1 = require("../../Models/Inventario/Insumo");
// Terminados
exports.herramientaTodos = genericos_controller_1.factoryModelTodos({ modelo: Herramienta_1.Herramienta });
exports.herramientaID = genericos_controller_1.factoryModelID({ modelo: Herramienta_1.Herramienta });
exports.herramientaActualizar = genericos_controller_1.factoryModelActualizarPorCampoRestriccion({ modelo: Herramienta_1.Herramienta }); // esto no permite actualizar cantidad
exports.herramientaEliminar = genericos_controller_1.factoryModelEliminarCondicionAnd({ modelo: Herramienta_1.Herramienta });
// Esto se puede hacer generico 
exports.herramientaIDMovimiento = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const respuesta = yield Herramienta_1.Herramienta.findOne({
            where: { id },
            include: [{
                    model: Herramienta_1.MovimientoHerramienta
                }]
        });
        return respuesta;
    }
    catch (error) {
        throw error;
    }
});
// Se pasa el elemento que se va a insertar y el elemento de la tabla intermedia
// El id a la tabla original se añade automaticamente.
exports.herramientaNuevo = (elemento, elementoMovimiento) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const respuesta = yield Herramienta_1.Herramienta.create(Object.assign({ MovimientoHerramienta: [elementoMovimiento] }, elemento), {
            include: [{
                    model: Herramienta_1.MovimientoHerramienta
                }]
        });
        return respuesta;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.herramientaIDInsumos = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const respuesta = yield Herramienta_1.Herramienta.findOne({
            where: { id },
            include: [{
                    model: Insumo_1.Insumo
                }]
        });
        return respuesta;
    }
    catch (error) {
        throw error;
    }
});
//# sourceMappingURL=herramienta.controller.js.map