"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const genericos_controller_1 = require("../genericos.controller");
const Insumo_1 = require("../../Models/Inventario/Insumo");
exports.unidadMedidaNuevo = genericos_controller_1.factoryModelNuevo({ modelo: Insumo_1.UnidadDeMedida });
exports.unidadMedidaTodos = genericos_controller_1.factoryModelTodos({ modelo: Insumo_1.UnidadDeMedida });
exports.unidadMedidaActualizar = genericos_controller_1.factoryModelActualizarId({ modelo: Insumo_1.UnidadDeMedida });
exports.unidadMedidaEliminar = genericos_controller_1.factoryModelEliminarCondicionAnd({ modelo: Insumo_1.UnidadDeMedida });
exports.unidadMedidaId = genericos_controller_1.factoryModelID({ modelo: Insumo_1.UnidadDeMedida });
//# sourceMappingURL=unidadmedida.controller.js.map