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
const Usuario_1 = __importDefault(require("../Models/Usuario/Usuario"));
const encriptar_1 = __importDefault(require("../utils/encriptar"));
const RolPermiso_1 = require("../Models/Usuario/RolPermiso");
// Función para verificar si existe un usuario
// Recibe un nombre de usuario y contraseña. Se encripta la contraseña y se busca en la base de datos
exports.usuarioLogin = (usuario, contrasena) => __awaiter(void 0, void 0, void 0, function* () {
    const contrasenaHash = encriptar_1.default(contrasena);
    try {
        const respuesta = yield Usuario_1.default.findOne({
            where: {
                usuario,
                contrasena: contrasenaHash,
            },
            include: [{
                    model: RolPermiso_1.Rol,
                    include: [{
                            model: RolPermiso_1.Permiso,
                        }]
                }]
        });
        return respuesta;
    }
    catch (error) {
        return error;
    }
});
//# sourceMappingURL=autorizacion.controller.js.map