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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.Router();
// -------------------- Controladores -------------------- 
const autorizacion_controller_1 = require("../Controllers/autorizacion.controller");
// -------------------- Rutas de autenticación -------------------- 
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usuario, contrasena } = req.body;
    try {
        const resultado = yield autorizacion_controller_1.usuarioLogin(usuario, contrasena);
        const resultadoLimpio = JSON.parse(JSON.stringify(resultado));
        if (resultado.usuario) {
            let token = jsonwebtoken_1.default.sign({ data: resultadoLimpio }, process.env.SECRET_KEY_JWT, { expiresIn: process.env.JWT_EXPIRES_IN });
            res.set('Auth', token).json(token);
        }
        else {
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).send('NEL');
    }
}));
router.get('/inicio', (req, res) => {
    try {
        const token = req.get('Auth');
        const resultado = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY_JWT);
        res.send(resultado);
    }
    catch (error) {
        res.send('MAL');
    }
});
router.get('/info', (req, res) => {
    try {
        let cookie = typeof req.get('Auth') == 'undefined' ? req.cookies.JWT : req.get('Auth');
        const resultado = jsonwebtoken_1.default.verify(cookie, process.env.SECRET_KEY_JWT);
        res.status(200).json({
            nombre: resultado.data.nombre,
            apellido: resultado.data.apellido,
            usuario: resultado.data.usuario
        });
    }
    catch (error) {
        res.status(400).json({ mensaje: 'Cookie invalida' });
    }
});
router.get('/verificar', (req, res) => {
    try {
        let cookie = typeof req.get('Auth') == 'undefined' ? req.cookies.JWT : req.get('Auth');
        const resultado = jsonwebtoken_1.default.verify(cookie, process.env.SECRET_KEY_JWT);
        res.status(200).send('OK');
    }
    catch (error) {
        res.status(400).send('NO');
    }
});
router.get('/sesionpermisos', (req, res) => {
    try {
        let cookie = typeof req.get('Auth') == 'undefined' ? req.cookies.JWT : req.get('Auth');
        const resultado = jsonwebtoken_1.default.verify(cookie, process.env.SECRET_KEY_JWT);
        if (resultado.data.usuario == 'admin') {
            res.json({ Admin: true });
        }
        else {
            res.json(resultado.data.Rol);
        }
    }
    catch (error) {
    }
});
exports.default = router;
//# sourceMappingURL=Autenticacion.js.map