"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
// -------------------- Controladores --------------------
const RolPermiso_1 = require("../../Models/Usuario/RolPermiso");
const manejadorGenerico_1 = __importDefault(require("../../Controllers/manejadorGenerico"));
// -------------------- Rutas Permiso --------------------
// Obtiene todos los permisos
router.get('/', manejadorGenerico_1.default({ modelo: RolPermiso_1.Permiso, accion: manejadorGenerico_1.default.LEER }));
// Obtiene un unico permiso
router.get('/:id', manejadorGenerico_1.default({ modelo: RolPermiso_1.Permiso, accion: manejadorGenerico_1.default.LEER_POR_ID }));
// Crear nuevo Permiso.
router.put('/:id', manejadorGenerico_1.default({ modelo: RolPermiso_1.Permiso, accion: manejadorGenerico_1.default.ACTUALIZAR_POR_ID }));
// Crear nuevo Permiso
router.post('/', manejadorGenerico_1.default({ modelo: RolPermiso_1.Permiso, accion: manejadorGenerico_1.default.CREAR }));
// Eliminar permiso.
router.delete('/:id', manejadorGenerico_1.default({ modelo: RolPermiso_1.Permiso, accion: manejadorGenerico_1.default.ELIMINAR_POR_ID }));
exports.default = router;
//# sourceMappingURL=Permiso.js.map