"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const genericos_controller_1 = require("../genericos.controller");
const Usuario_1 = __importDefault(require("../../Models/Usuario/Usuario"));
// Usuario
exports.usuarioNuevo = genericos_controller_1.factoryModelNuevo({ modelo: Usuario_1.default });
exports.usuarioActualizar = genericos_controller_1.factoryModelActualizarPorCampo({ modelo: Usuario_1.default });
//# sourceMappingURL=usuario.controller.js.map