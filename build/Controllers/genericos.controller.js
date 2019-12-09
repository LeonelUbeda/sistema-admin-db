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
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.factoryModelTodos = ({ modelo, include = [] }) => {
    return (_a) => __awaiter(void 0, void 0, void 0, function* () {
        var { limite = '10', offset = '0' } = _a, busqueda = __rest(_a, ["limite", "offset"]);
        let busquedaSubstring = {};
        for (let propiedad in busqueda) {
            if (propiedad.includes('.')) {
                let nuevoString = '$' + propiedad + '$';
                busquedaSubstring[nuevoString] = {
                    [sequelize_1.Op.substring]: busqueda[propiedad]
                };
            }
            else {
                busquedaSubstring[propiedad] = (propiedad.slice(propiedad.length - 2) === 'Id' || propiedad === 'id') ? busqueda[propiedad] : { [sequelize_1.Op.substring]: busqueda[propiedad] };
            }
            console.log(propiedad, busqueda[propiedad]);
        } //'$items.itemId$': itemParam
        /*busquedaSubstring['$rol.nombre$'] = {
            [Op.substring] : 'ca'
        }*/
        try {
            const respuesta = yield modelo.findAll({
                where: busquedaSubstring,
                limit: parseInt(limite),
                offset: parseInt(offset),
                include
            });
            return respuesta;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    });
};
exports.factoryModelID = ({ modelo, include = [] }) => {
    return (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const respuesta = yield modelo.findOne({
                where: { id },
                include
            });
            return respuesta;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    });
};
// Recibe todos los campos de la tabla. Si no se pasa un campo obligatorio manda un error
exports.factoryModelNuevo = ({ modelo }) => {
    return (elemento) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const respuesta = yield modelo.create(Object.assign({}, elemento));
            return respuesta;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    });
};
/* WIP no se si sea necesario la verdad, luego de terminar lo de inventario veo si la implemento
// Recibe los campos de la tabla principal y la de su tabla de movimiento.
export const factoryModelNuevoMovimiento = ({ modelo, modeloMovimiento, llaveForanea = "string" }) => {
    return async ( elemento: object, elementoMovimiento: object ) => {
        try {
            const respuesta = await modelo.build({ ...elemento })
            const trasanccionMovimiento = await modeloMovimiento.build({ ...elementoMovimiento })
        }
        catch (error) {
            console.log(error)
            throw error
        }
    }
}
*/
// Recibe un id y los campos a actualizar con sus respectivos valores
// {id: 4, nombre: 'Ricardo',  apellido: 'Juancho'}
// Se tomará nombre y apellido como parte de los campos a actualizar y el ID como la condición (where)
exports.factoryModelActualizarId = ({ modelo }) => {
    return (_a) => __awaiter(void 0, void 0, void 0, function* () {
        var { id } = _a, camposActualizar = __rest(_a, ["id"]);
        try {
            const respuesta = yield modelo.update(camposActualizar, { where: { id } });
            console.log(respuesta);
            return respuesta;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    });
};
// Funcion para actualizar tablas con una condición. 
// Se creó porque habian tablas que la llave primaria NO eran números incrementales
// Recibe un objeto con los campos a actualizar y un objeto con la condición
// camposActualizar: {direccion: 'Mi casita'} / condicion: {nombre: 'Developer'}
exports.factoryModelActualizarPorCampo = ({ modelo }) => {
    return (camposActualizar, condicion) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Esto hace un: 
            // UPDATE modelo SET camposActualizar WHERE campo = valor
            const respuesta = yield modelo.update(Object.assign({}, camposActualizar), { where: Object.assign({}, condicion) });
            return respuesta;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    });
};
// El mismo factoryModelPorCampo, con la diferencia es que tiene un campo restriccion.
// Esto la verdad creo que puede incluirse en la funcion anterior, dejando el campo
// restriccion con un default vacio.
// No se si deberia de la restriccion tendria que llamarse desde el controlador o la ruta.
exports.factoryModelActualizarPorCampoRestriccion = ({ modelo }) => {
    return (camposActualizar, condicion, restricciones) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            for (let restriccion of restricciones) {
                if (camposActualizar.hasOwnProperty(restriccion)) {
                    throw new Error("Placeholder"); // Hay que crear un error nuevo para esto, despues se hace
                }
            }
            const respuesta = yield modelo.update(Object.assign({}, camposActualizar), { where: Object.assign({}, condicion) });
            return respuesta;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    });
};
// Recibe un objeto con las condiciones para eliminar registros
exports.factoryModelEliminarCondicionAnd = ({ modelo }) => {
    return (condiciones) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const respuesta = yield modelo.destroy({ where: Object.assign({}, condiciones) });
            return respuesta;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    });
};
//# sourceMappingURL=genericos.controller.js.map