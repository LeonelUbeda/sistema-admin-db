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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const manejadorGenerico_1 = __importDefault(require("../../Controllers/manejadorGenerico"));
const Usuario_1 = __importDefault(require("../../Models/Usuario/Usuario"));
// -------------------- Controladores --------------------
const usuario_controller_1 = require("../../Controllers/Usuario/usuario.controller");
// -------------------- Utils --------------------
const encriptar_1 = __importDefault(require("../../utils/encriptar"));
const RolPermiso_1 = require("../../Models/Usuario/RolPermiso");
// -------------------- Rutas Usuario --------------------
router.get('/', manejadorGenerico_1.default({ modelo: Usuario_1.default, accion: manejadorGenerico_1.default.LEER,
    include: [{
            model: RolPermiso_1.Rol
        }]
}));
router.get('/:nombre', manejadorGenerico_1.default({ modelo: Usuario_1.default, accion: manejadorGenerico_1.default.LEER_PARAMETROS }));
router.get('/:nombre/info', manejadorGenerico_1.default({
    modelo: Usuario_1.default,
    accion: manejadorGenerico_1.default.LEER_PARAMETROS,
    include: [{
            model: RolPermiso_1.Rol,
            include: [{
                    model: RolPermiso_1.Permiso,
                    through: {
                        attributes: ['nivelAcceso']
                    }
                }]
        }]
}));
// Crear nuevo Usuario.     Obligatorio: usuario, nombre, rolId.    Opcional: apellido
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let _a = req.body, { contrasena, usuario } = _a, elemento = __rest(_a, ["contrasena", "usuario"]);
    usuario = usuario ? usuario.toLowerCase() : null;
    contrasena = contrasena ? encriptar_1.default(contrasena) : null;
    try {
        const resultado = yield usuario_controller_1.usuarioNuevo(Object.assign({ contrasena, usuario }, elemento));
        res.status(201).json(resultado);
    }
    catch (error) {
        res.status(400).json({ mensaje: 'Error' });
    }
}));
// Actualizar un usuario.   Obligatorio: usuario     Opcional: campos a actualizar
router.put('/:usuario', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let _b = req.body, { contrasena } = _b, elemento = __rest(_b, ["contrasena"]);
    const { usuario } = req.params;
    let objetoAMandar = Object.assign({}, elemento);
    // Si en el body del request existe contraseña entonces se añade la propiedad contraseña
    // y su respectivo valor al objeto objetoAMandar
    if (typeof contrasena !== 'undefined') {
        objetoAMandar.contrasena = contrasena ? encriptar_1.default(contrasena) : null;
    }
    try {
        let cookie = typeof req.get('Auth') == 'undefined' ? req.cookies.JWT : req.get('Auth');
        const resultadoJWT = jsonwebtoken_1.default.verify(cookie, process.env.SECRET_KEY_JWT);
        // Si el usuario que solicita modificar es el mismo que esta en el token 
        //(o mejor dicho, el que esta en la sesion), entonces...
        // O si el de la sesion es el usuario admin...
        if (usuario == resultadoJWT.data.usuario || resultadoJWT.data.usuario == 'admin') {
            const resultado = yield usuario_controller_1.usuarioActualizar(objetoAMandar, { usuario });
            res.status(201).json(resultado);
        }
        else {
            throw 'Se esta intentando editar un usuario sin los permisos suficientes';
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ mensaje: 'Error' });
    }
}));
router.delete('/:usuario', manejadorGenerico_1.default({ modelo: Usuario_1.default, accion: manejadorGenerico_1.default.ELIMINAR_POR_PARAMETROS }));
exports.default = router;
//# sourceMappingURL=Usuario.js.map