"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SequelizeMock {
    constructor() {
        this._dataset = {};
    }
    insertDataset(dataset) {
        if (typeof dataset !== 'object' || Array.isArray(dataset)) {
            throw new Error('Dataset debe ser un objeto');
        }
        for (const value of Object.values(dataset)) {
            if (!Array.isArray(value))
                throw new Error('Las tablas deben ser un array');
        }
        this._dataset = dataset;
        return this._dataset;
    }
    getTable(tabla) {
        const tablaResultado = this._dataset[tabla];
        if (!tablaResultado)
            throw new Error('La tabla no existe en el dataset');
        return tablaResultado;
    }
    clearDataset() {
        this._dataset = {};
        return this._dataset;
    }
}
exports.SequelizeMock = SequelizeMock;
SequelizeMock.INTEGER = (val) => typeof val === 'number';
SequelizeMock.STRING = (length) => (val) => typeof val === 'string' && val.length < length;
SequelizeMock.ENUM = ({ values }) => (val) => values.include(val);
SequelizeMock.DATE = (val) => typeof val === 'string' && true;
SequelizeMock.TINYINT = (val) => SequelizeMock.INTEGER(val) && val < 256;
//# sourceMappingURL=SequelizeMock.js.map