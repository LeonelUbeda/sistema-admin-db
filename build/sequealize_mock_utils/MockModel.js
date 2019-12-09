"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Operadores_1 = require("./Operadores");
class MockModel {
    static init(estructura, { sequelize, tableName }) {
        this._modelo = estructura;
        this._sequelize = sequelize;
        this._nombreTabla = tableName;
        for (const [campo, opciones] of Object.entries(estructura)) {
            if (Object.keys(opciones).includes('primaryKey')) {
                this._pk = campo;
                break;
            }
        }
        this._resultados = this._sequelize.getTable(this._nombreTabla);
    }
    static handleOperaciones(operadores, tupla, where, llave) {
        for (const operador of operadores) {
            const condiciones = where[operador];
            switch (operador) {
                //Operadores Binarios
                case Operadores_1.Op.or: {
                    for (const condicion of condiciones) {
                        let resultadoInnerAnd = true; // Todas la condiciones dentro del objecto condicion se tienen que cumplir
                        const llavesCondicion = Object.keys(condicion);
                        for (const llave of llavesCondicion) {
                            if (tupla[llave] !== condicion[llave]) {
                                resultadoInnerAnd = false;
                            }
                            else {
                                break;
                            }
                        }
                        if (resultadoInnerAnd) {
                            return resultadoInnerAnd;
                        }
                    }
                    break;
                }
                // Operadores Unarios
                case Operadores_1.Op.eq: {
                    if (tupla[llave] === condiciones) {
                        return true;
                    }
                    break;
                }
                case Operadores_1.Op.gt: {
                    if (tupla[llave] > condiciones) {
                        return true;
                    }
                    break;
                }
                case Operadores_1.Op.gte: {
                    if (tupla[llave] >= condiciones) {
                        return true;
                    }
                    break;
                }
                case Operadores_1.Op.lt: {
                    if (tupla[llave] < condiciones) {
                        return true;
                    }
                    break;
                }
                case Operadores_1.Op.lte: {
                    if (tupla[llave] <= condiciones) {
                        return true;
                    }
                    break;
                }
                case Operadores_1.Op.neq: {
                    if (tupla[llave] !== condiciones) {
                        return true;
                    }
                    break;
                }
                case Operadores_1.Op.is: {
                    return this.handleOperaciones([Operadores_1.Op.eq], tupla, where, llave);
                }
                case Operadores_1.Op.not: {
                    return this.handleOperaciones([Operadores_1.Op.neq], tupla, where, llave);
                }
            }
        }
    }
    static seleccion(where = {}) {
        let resultado = [];
        const llaves = Object.keys(where);
        const operadores = Object.getOwnPropertySymbols(where);
        const hayLlaves = llaves.length > 0;
        const hayOperadores = operadores.length > 0;
        if (!(hayLlaves || hayOperadores)) {
            resultado = this._resultados;
        }
        else {
            resultado = this._resultados.filter((tupla) => {
                let resultadoBooleano = true;
                if (hayOperadores) {
                    resultadoBooleano = this.handleOperaciones(operadores, tupla, where);
                }
                llaves.forEach(llave => {
                    if (typeof where[llave] === 'object') {
                        const operaciones = Object.getOwnPropertySymbols(where[llave]);
                        resultadoBooleano = this.handleOperaciones(operaciones, tupla, where[llave], llave);
                    }
                    else if (tupla[llave] !== where[llave]) {
                        resultadoBooleano = false;
                    }
                });
                return resultadoBooleano;
            });
        }
        return resultado;
    }
    static proyeccion(atributos, seleccion) {
        if (!Array.isArray(atributos)) {
            throw new Error('Atributos Los atributos tienen que ser un array de strings');
        }
        return seleccion.map((tupla) => {
            const nuevoObjeto = {};
            for (const atributo of atributos) {
                nuevoObjeto[atributo] = tupla[atributo];
            }
            return nuevoObjeto;
        });
    }
    static findAll(options) {
        if (options) {
            const { attributes, limit, offset, where, include } = options;
            let results = this.seleccion(where);
            if (offset) {
                results = results.slice(offset);
            }
            if (limit) {
                if (typeof limit !== 'number') {
                    throw new Error('limit tiene que ser de tipo numerico');
                }
                else {
                    results = results.slice(0, limit);
                }
            }
            if (attributes) {
                results = this.proyeccion(attributes, results);
            }
            if (include) {
                for (const objetoIncluir of include) {
                    if (this._belongsToMany[objetoIncluir.model.name]) {
                        const asociacion = this._belongsToMany[objetoIncluir.model.name];
                        const foreignKeyEstaTabla = asociacion.foreignKey;
                        console.log(foreignKeyEstaTabla);
                        const laOtraTablaEstaAsociada = asociacion.modelo._belongsToMany[this.name];
                        if (!laOtraTablaEstaAsociada)
                            throw new Error();
                        const foreignKeyTablaAIncluir = laOtraTablaEstaAsociada.foreignKey;
                        const modeloAUnir = objetoIncluir.model;
                        const tablaAUnir = this[`get${modeloAUnir.name}`]();
                        console.log(asociacion.through.model.name);
                        const tablaIntermedia = this[`get${asociacion.through.model.name}`]();
                        console.log(this[`get${asociacion.through.model.name}`]);
                        console.log(tablaIntermedia);
                        results = results.map((tupla) => {
                            const nuevaTupla = tupla;
                            nuevaTupla[asociacion.as] = [];
                            for (const tuplaTablaIntermedia of tablaIntermedia) {
                                for (const tuplaTablaAsociada of tablaAUnir) {
                                    if (tuplaTablaIntermedia[foreignKeyEstaTabla] === tupla[this._pk]
                                        && tuplaTablaIntermedia[foreignKeyTablaAIncluir] === tuplaTablaAsociada[modeloAUnir._pk]) {
                                        nuevaTupla[asociacion.as].push(tuplaTablaAsociada);
                                    }
                                }
                            }
                            return nuevaTupla;
                        });
                    }
                    if (this._belongsTo[objetoIncluir.model.name]) {
                    }
                    if (this._hasOne[objetoIncluir.model.name]) {
                    }
                    if (this._hasMany[objetoIncluir.model.name]) {
                    }
                }
            }
            return results;
        }
        return this.seleccion();
    }
    static findOne(options) {
        const result = [this.findAll(options)[0]];
        return result;
    }
    /*
    Asosiaciones
    en los has_ se generan metodos para ingresar datos en la tabla que dominan
    Si estas relaciones tienen la opcion 'trough'
    Primero ingresan en la otra tabla
    y luego en la tabla intermedia crean una nueva tupla que contiene ambas pk's
    
    */
    static belongsTo(modelo, opciones) {
        // Recibe el Modelo, agrega el campo que corresponde al pk del due;o
        let modeloEnBelongsTo = false;
        if (this._belongsToMany[modelo.name]) {
            modeloEnBelongsTo = true;
        }
        if (!modeloEnBelongsTo) {
        }
    }
    static hasOne(modelo, opciones) {
        //Recibe el modelo del que es due;o, y llama al belongsTo del modelo hijo
        let modeloEnHas = false;
        this._hasOne.forEach((valor) => {
            if (valor.modelo.name === modelo.name) {
                modeloEnHas = true;
            }
        });
        if (!modeloEnHas) {
        }
    }
    static hasMany(modelo, opciones) {
        //Recibe el modelo del que es due;o, y llama al belongsTo del modelo hijo
        // Revisar si el model ya esta ingresado
        let modeloEnHasMany = false;
        this._hasMany.forEach((valor) => {
            if (valor.modelo.name === modelo.name) {
                modeloEnHasMany = true;
            }
        });
        // Si no esta lo agrega
        if (!modeloEnHasMany) {
        }
    }
    // Asosiacion Muchos Muchos
    static belongsToMany(modelo, opciones) {
        // Me aseguro que no se repita la asosiacion muchos muchos
        let modeloEnBelongsTo = false;
        if (this._belongsToMany[modelo.name]) {
            modeloEnBelongsTo = true;
        }
        if (!modeloEnBelongsTo) {
            if (!opciones.through)
                throw new Error('through requerido');
            const nombreModelo = modelo.name;
            const thisPk = modelo._pk;
            const llaveForanea = this.name.toLowerCase() + thisPk.charAt(0).toUpperCase() + thisPk.slice(1);
            const options = Object.assign({
                as: nombreModelo.toLowerCase(),
                foreignKey: llaveForanea,
            }, opciones || {});
            const tablaIntermedia = opciones.through.model;
            modelo[`get${tablaIntermedia.name}`] = (opciones) => tablaIntermedia.findAll(opciones);
            modelo[`get${this.name}`] = (opciones) => this.findAll(opciones);
            this._belongsToMany[nombreModelo] = Object.assign({ modelo }, options);
            console.log(`${this.name}._belongsToMany[${nombreModelo} = {${JSON.stringify(this._belongsToMany[nombreModelo])}`);
        }
    }
}
exports.MockModel = MockModel;
MockModel._resultados = [];
MockModel._nombreTabla = '';
MockModel._belongsTo = {};
MockModel._belongsToMany = {};
MockModel._hasMany = [];
MockModel._hasOne = [];
MockModel._pk = '';
MockModel._modelo = {};
//# sourceMappingURL=MockModel.js.map