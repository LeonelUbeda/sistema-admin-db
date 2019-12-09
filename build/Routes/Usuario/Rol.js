"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
// -------------------- Controladores --------------------
const manejadorGenerico_1 = __importDefault(require("../../Controllers/manejadorGenerico"));
const RolPermiso_1 = require("../../Models/Usuario/RolPermiso");
// -------------------- Rutas Rol --------------------
// Ruta generica para buscar roles
router.get('/', manejadorGenerico_1.default({ modelo: RolPermiso_1.Rol, accion: manejadorGenerico_1.default.LEER }));
// Obtener Rol por id
router.get('/:id', manejadorGenerico_1.default({ modelo: RolPermiso_1.Rol, accion: manejadorGenerico_1.default.LEER_POR_ID }));
// Crear nuevo Rol.
router.post('/', manejadorGenerico_1.default({ modelo: RolPermiso_1.Rol, accion: manejadorGenerico_1.default.CREAR }));
// Actualizar un Rol.
router.put('/:id', manejadorGenerico_1.default({ modelo: RolPermiso_1.Rol, accion: manejadorGenerico_1.default.ACTUALIZAR_POR_ID }));
// Borrar Rol por id
router.delete('/:id', manejadorGenerico_1.default({ modelo: RolPermiso_1.Rol, accion: manejadorGenerico_1.default.ELIMINAR_POR_ID }) /*function(req, res) {
    res.status(400).end()
}*/);
// Obtener la informacion del Rol junto a sus permisos
router.get('/:id/permisos', manejadorGenerico_1.default({
    modelo: RolPermiso_1.Rol,
    accion: manejadorGenerico_1.default.LEER_PARAMETROS,
    include: [{
            model: RolPermiso_1.Permiso,
            through: { attributes: ['nivelAcceso'] }
        }]
}));
exports.default = router;
//# sourceMappingURL=Rol.js.map