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
const Servicio_1 = __importDefault(require("../Servicio/Servicio"));
const Cotizacion_1 = __importDefault(require("./Cotizacion"));
class CotizacionServicio extends sequelize_1.Model {
}
CotizacionServicio.init({
    precio: {
        type: sequelize_1.default.FLOAT(10, 2),
        allowNull: false
    },
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
}, {
    sequelize: database_1.default,
    tableName: 'cotizacionservicio',
    schema: 'ventas'
});
Servicio_1.default.belongsToMany(Cotizacion_1.default, {
    through: {
        model: CotizacionServicio
    },
    foreignKey: 'servicioId'
});
Cotizacion_1.default.belongsToMany(Servicio_1.default, {
    through: {
        model: CotizacionServicio
    },
    foreignKey: 'cotizacionId'
});
exports.default = Cotizacion_1.default;
//# sourceMappingURL=CotizacionServicio.js.map