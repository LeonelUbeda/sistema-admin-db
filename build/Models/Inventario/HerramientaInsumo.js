"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../Database/database"));
const Herramienta_1 = require("./Herramienta");
const Insumo_1 = require("./Insumo");
class HerramientaInsumo extends sequelize_1.Model {
}
HerramientaInsumo.init({}, {
    sequelize: database_1.default,
    tableName: 'herramientainsumo'
});
Herramienta_1.Herramienta.belongsToMany(Insumo_1.Insumo, {
    through: HerramientaInsumo,
    foreignKey: 'herramientaId'
});
Insumo_1.Insumo.belongsToMany(Herramienta_1.Herramienta, {
    through: HerramientaInsumo,
    foreignKey: 'insumoId'
});
//# sourceMappingURL=HerramientaInsumo.js.map