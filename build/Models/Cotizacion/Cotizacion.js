"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importStar(require("sequelize"));
const database_1 = __importDefault(require("../../Database/database"));
const Cliente_1 = __importDefault(require("../Cliente"));
class Cotizacion extends sequelize_1.Model {
}
Cotizacion.init({
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fechaCreacion: {
        type: sequelize_1.default.STRING(30),
        allowNull: false
    },
    validoHasta: {
        type: sequelize_1.default.DATE,
        allowNull: false,
        defaultValue: sequelize_1.default.NOW
    },
    clienteId: {
        type: sequelize_1.default.INTEGER
    }
}, {
    sequelize: database_1.default,
    tableName: 'cotizacion',
    schema: 'ventas'
});
Cliente_1.default.hasMany(Cotizacion, {
    foreignKey: 'clienteId'
});
exports.default = Cotizacion;
//# sourceMappingURL=Cotizacion.js.map