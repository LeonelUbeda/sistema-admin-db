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
Object.defineProperty(exports, "__esModule", { value: true });
const genericos_controller_1 = require("./genericos.controller");
const manejadorGenerico = ({ modelo, accion, include = [] }) => {
    const HTTP = {
        // Retorna los registros que coinciden con las variables del req.query
        // 
        leer: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            const consulta = req.query;
            const modeloLeer = genericos_controller_1.factoryModelTodos({ modelo, include });
            try {
                const resultado = yield modeloLeer(consulta);
                res.status(200).json(resultado);
            }
            catch (error) {
                res.status(400).json({ mensaje: 'Error' });
            }
        }),
        leerId: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            const { id } = req.params;
            const modeloTodosId = genericos_controller_1.factoryModelID({ modelo, include });
            try {
                const resultado = yield modeloTodosId(parseInt(id));
                res.status(200).json(resultado);
            }
            catch (error) {
                res.status(400).json({ mensaje: 'Error' });
            }
        }),
        // Retorna los registros que coinciden con los parametros en req.params
        // Ademas hace la busqueda por req.query
        leerParametros: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            const consulta = req.query;
            const parametros = req.params;
            const modeloLeer = genericos_controller_1.factoryModelTodos({ modelo, include });
            try {
                const resultado = yield modeloLeer(Object.assign(Object.assign({}, consulta), parametros));
                res.status(200).json(resultado);
            }
            catch (error) {
                res.status(400).json({ mensaje: 'Error' });
            }
        }),
        crear: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            const elemento = req.body;
            const query = req.params;
            const modeloCrear = genericos_controller_1.factoryModelNuevo({ modelo });
            try {
                const resultado = yield modeloCrear(Object.assign(Object.assign({}, elemento), query));
                res.status(201).json(resultado);
            }
            catch (error) {
                res.status(400).json({ mensaje: 'Error' });
            }
        }),
        //
        actualizarPorId: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            const identificador = req.params;
            const elemento = req.body;
            const modeloActualizar = genericos_controller_1.factoryModelActualizarId({ modelo });
            try {
                const resultado = yield modeloActualizar(Object.assign(Object.assign({}, identificador), elemento));
                res.status(201).json(resultado);
            }
            catch (error) {
                res.status(400).json({ mensaje: 'Error' });
            }
        }),
        // Actualiza todos los registros que coinciden con los parametros en req.params
        // La variable tiene que ser la misma que en la tabla. Ejemplo. Tabla telefono: clienteId, telefono
        // /api/cliente/:clienteId/telefono/:telefono da como resultado where: {clienteId: clienteId, telefono: telefono}
        // de otra forma el where será invalido
        actualizarPorParametros: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            const identificador = req.params;
            const camposActualizar = req.body;
            const modeloActualizar = genericos_controller_1.factoryModelActualizarPorCampo({ modelo });
            try {
                const resultado = yield modeloActualizar(camposActualizar, identificador);
                res.status(201).json(resultado);
            }
            catch (error) {
                res.status(400).json({ mensaje: 'Error' });
            }
        }),
        eliminarPorId: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            const { id } = req.params;
            const modeloEliminar = genericos_controller_1.factoryModelEliminarCondicionAnd({ modelo });
            try {
                const resultado = yield modeloEliminar({ id });
                res.status(200).json(resultado);
            }
            catch (error) {
                res.status(400).json({ mensaje: 'Error' });
            }
        }),
        // Elimina por condiciones que estan en los parametros
        eliminarPorCondicion: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            const condiciones = req.params;
            const modeloEliminar = genericos_controller_1.factoryModelEliminarCondicionAnd({ modelo });
            try {
                const resultado = yield modeloEliminar(condiciones);
                res.status(200).json(resultado);
            }
            catch (error) {
                res.status(400).json({ mensaje: 'Error' });
            }
        })
    };
    return HTTP[accion];
};
manejadorGenerico.LEER = 'leer';
manejadorGenerico.LEER_POR_ID = 'leerId';
manejadorGenerico.CREAR = 'crear';
manejadorGenerico.ELIMINAR_POR_ID = 'eliminarPorId';
manejadorGenerico.ACTUALIZAR_POR_PARAMETROS = 'actualizarPorParametros';
manejadorGenerico.ACTUALIZAR_POR_ID = 'actualizarPorId';
manejadorGenerico.LEER_PARAMETROS = 'leerParametros';
manejadorGenerico.ELIMINAR_POR_PARAMETROS = 'eliminarPorCondicion';
exports.default = manejadorGenerico;
//# sourceMappingURL=manejadorGenerico.js.map