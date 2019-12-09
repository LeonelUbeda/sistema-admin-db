"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const genericos_controller_1 = require("../genericos.controller");
const Herramienta_1 = require("../../Models/Inventario/Herramienta");
exports.categoriaNuevo = genericos_controller_1.factoryModelNuevo({ modelo: Herramienta_1.Categoria });
exports.categoriaTodos = genericos_controller_1.factoryModelTodos({ modelo: Herramienta_1.Categoria });
exports.categoriaActualizar = genericos_controller_1.factoryModelActualizarId({ modelo: Herramienta_1.Categoria });
exports.categoriaEliminar = genericos_controller_1.factoryModelEliminarCondicionAnd({ modelo: Herramienta_1.Categoria });
exports.categoriaId = genericos_controller_1.factoryModelID({ modelo: Herramienta_1.Categoria });
//# sourceMappingURL=categoria.controller.js.map