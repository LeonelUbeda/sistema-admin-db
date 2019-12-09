"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const manejadorGenerico_1 = __importDefault(require("../../Controllers/manejadorGenerico"));
const Marca_1 = __importDefault(require("../../Models/Vehiculo/Marca"));
const Modelo_1 = __importDefault(require("../../Models/Vehiculo/Modelo"));
const Version_1 = __importDefault(require("../../Models/Vehiculo/Version"));
const Tipo_1 = __importDefault(require("../../Models/Vehiculo/Tipo"));
// Ruta generica para buscar roles
// -------------------- Rutas Marca --------------------
router.get('/marcas/', manejadorGenerico_1.default({ modelo: Marca_1.default, accion: manejadorGenerico_1.default.LEER_PARAMETROS }));
router.get('/marcas/:id', manejadorGenerico_1.default({ modelo: Marca_1.default, accion: manejadorGenerico_1.default.LEER_POR_ID }));
router.post('/marcas/', manejadorGenerico_1.default({ modelo: Marca_1.default, accion: manejadorGenerico_1.default.CREAR }));
router.put('/marcas/:id', manejadorGenerico_1.default({ modelo: Marca_1.default, accion: manejadorGenerico_1.default.ACTUALIZAR_POR_ID }));
router.delete('/marcas/:id', manejadorGenerico_1.default({ modelo: Marca_1.default, accion: manejadorGenerico_1.default.ELIMINAR_POR_ID }));
// -------------------- Rutas Marca/Modelo --------------------
// Obtener modelos de una marca
router.get('/marcas/:marcaId/modelos', manejadorGenerico_1.default({ modelo: Modelo_1.default, accion: manejadorGenerico_1.default.LEER_PARAMETROS }));
// Crear un modelo con la marca especificada
router.post('/marcas/:marcaId/modelos', manejadorGenerico_1.default({ modelo: Modelo_1.default, accion: manejadorGenerico_1.default.CREAR }));
// Eliminar todas las versiones de un modelo
router.delete('/marcas/:marcaId/modelos', manejadorGenerico_1.default({ modelo: Modelo_1.default, accion: manejadorGenerico_1.default.ELIMINAR_POR_PARAMETROS }));
// -------------------- Rutas Modelo --------------------
router.get('/modelos', manejadorGenerico_1.default({ modelo: Modelo_1.default, accion: manejadorGenerico_1.default.LEER,
    include: [{
            model: Marca_1.default
        }]
}));
router.get('/modelos/:id', manejadorGenerico_1.default({ modelo: Modelo_1.default, accion: manejadorGenerico_1.default.LEER_POR_ID }));
router.put('/modelos/:id', manejadorGenerico_1.default({ modelo: Modelo_1.default, accion: manejadorGenerico_1.default.ACTUALIZAR_POR_ID }));
router.delete('/modelos/:id', manejadorGenerico_1.default({ modelo: Modelo_1.default, accion: manejadorGenerico_1.default.ELIMINAR_POR_ID }));
// -------------------- Rutas Modelo/Version --------------------
// Obtener versiones de un modelo especifico
router.get('/modelos/:modeloId/versiones', manejadorGenerico_1.default({ modelo: Version_1.default, accion: manejadorGenerico_1.default.LEER_PARAMETROS }));
// Crear una version con el modelo especificado
router.post('/modelos/:modeloId/versiones', manejadorGenerico_1.default({ modelo: Version_1.default, accion: manejadorGenerico_1.default.CREAR }));
// Eliminar todas las versiones de un modelo
router.delete('/modelos/:modeloId/versiones', manejadorGenerico_1.default({ modelo: Version_1.default, accion: manejadorGenerico_1.default.ELIMINAR_POR_PARAMETROS }));
// -------------------- Rutas Version --------------------
router.get('/versiones', manejadorGenerico_1.default({ modelo: Version_1.default, accion: manejadorGenerico_1.default.LEER,
    include: [{
            model: Modelo_1.default
        }]
}));
router.get('/versiones/:id', manejadorGenerico_1.default({ modelo: Version_1.default, accion: manejadorGenerico_1.default.LEER_POR_ID }));
router.put('/versiones/:id', manejadorGenerico_1.default({ modelo: Version_1.default, accion: manejadorGenerico_1.default.ACTUALIZAR_POR_ID }));
router.delete('/versiones/:id', manejadorGenerico_1.default({ modelo: Version_1.default, accion: manejadorGenerico_1.default.ELIMINAR_POR_ID }));
// -------------------- Rutas Tipo --------------------
router.get('/tipos', manejadorGenerico_1.default({ modelo: Tipo_1.default, accion: manejadorGenerico_1.default.LEER }));
router.get('/tipos/:id', manejadorGenerico_1.default({ modelo: Tipo_1.default, accion: manejadorGenerico_1.default.LEER_POR_ID }));
router.post('/tipos', manejadorGenerico_1.default({ modelo: Tipo_1.default, accion: manejadorGenerico_1.default.CREAR }));
router.put('/tipos/:id', manejadorGenerico_1.default({ modelo: Tipo_1.default, accion: manejadorGenerico_1.default.ACTUALIZAR_POR_ID }));
router.delete('/tipos/:id', manejadorGenerico_1.default({ modelo: Tipo_1.default, accion: manejadorGenerico_1.default.ELIMINAR_POR_ID }));
exports.default = router;
//# sourceMappingURL=ClasificacionAuto.js.map