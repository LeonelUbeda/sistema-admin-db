"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
// -------------------- Controladores --------------------
const manejadorGenerico_1 = __importDefault(require("../../Controllers/manejadorGenerico"));
// -------------------- Modelos --------------------
const RolPermiso_1 = require("../../Models/Usuario/RolPermiso");
router.get('/', manejadorGenerico_1.default({ modelo: RolPermiso_1.RolPermiso, accion: manejadorGenerico_1.default.LEER }));
router.post('/', manejadorGenerico_1.default({ modelo: RolPermiso_1.RolPermiso, accion: manejadorGenerico_1.default.CREAR }));
// api/rolpermiso/rol/2/permiso/6
router.put('/rol/:rolId/permiso/:permisoId', manejadorGenerico_1.default({ modelo: RolPermiso_1.RolPermiso, accion: manejadorGenerico_1.default.ACTUALIZAR_POR_PARAMETROS }));
router.delete('/rol/:rolId/permiso/:permisoId', manejadorGenerico_1.default({ modelo: RolPermiso_1.RolPermiso, accion: manejadorGenerico_1.default.ELIMINAR_POR_PARAMETROS }));
// api/rolpermiso/rol/2
// Por si se quiere borrar todos los registros que conincidan con el rolId
router.delete('/rol/:rolId', manejadorGenerico_1.default({ modelo: RolPermiso_1.RolPermiso, accion: manejadorGenerico_1.default.ELIMINAR_POR_PARAMETROS }));
// api/rolpermiso/permiso/6
// Lo mismo que arriba
router.delete('/permiso/:permisoId', manejadorGenerico_1.default({ modelo: RolPermiso_1.RolPermiso, accion: manejadorGenerico_1.default.ELIMINAR_POR_PARAMETROS }));
exports.default = router;
//# sourceMappingURL=RolPermiso.js.map