"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sha256_1 = __importDefault(require("crypto-js/sha256"));
/**
 * @param texto Recibe un string y lo encripta con SHA256
 * @return Retorna el el string encriptado
 */
const encriptar = (texto) => {
    return sha256_1.default(texto).toString();
};
exports.default = encriptar;
//# sourceMappingURL=encriptar.js.map