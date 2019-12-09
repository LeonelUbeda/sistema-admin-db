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
const Usuario_1 = __importDefault(require("../Usuario/Usuario"));
const Ticket_1 = __importDefault(require("../Ticket/Ticket"));
const Cliente_1 = __importDefault(require("../Cliente"));
class Factura extends sequelize_1.Model {
}
Factura.init({
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fechaCreacion: {
        type: sequelize_1.default.DATE,
        allowNull: false,
        defaultValue: sequelize_1.default.NOW
    },
    fechaPago: {
        type: sequelize_1.default.DATE,
    },
    aplicarDescuento: {
        type: sequelize_1.default.BOOLEAN,
        defaultValue: false
    },
    total: {
        type: sequelize_1.default.FLOAT(12, 2),
        allowNull: false
    }
}, {
    sequelize: database_1.default,
    tableName: 'factura',
    schema: 'ventas'
});
Factura.belongsTo(Ticket_1.default, {
    foreignKey: 'ticketId'
});
Factura.belongsTo(Usuario_1.default, {
    foreignKey: 'usuario'
});
Factura.belongsTo(Cliente_1.default, {
    foreignKey: 'clienteId'
});
exports.default = Factura;
//# sourceMappingURL=Factura.js.map