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
const Vehiculo_1 = __importDefault(require("../Vehiculo/Vehiculo"));
class Ticket extends sequelize_1.Model {
}
Ticket.init({
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    vehiculoId: {
        type: sequelize_1.default.INTEGER,
        allowNull: false
    },
    clienteId: {
        type: sequelize_1.default.INTEGER,
        allowNull: false
    },
    fechaInicio: {
        type: sequelize_1.default.DATEONLY,
        allowNull: true
    },
    fechaFinal: {
        type: sequelize_1.default.DATEONLY,
        allowNull: true
    }
}, {
    sequelize: database_1.default,
    modelName: 'ticket',
    schema: 'ticket'
});
Ticket.belongsTo(Cliente_1.default, { foreignKey: 'clienteId', targetKey: 'id' });
Ticket.belongsTo(Vehiculo_1.default, { foreignKey: 'vehiculoId', targetKey: 'id' });
exports.default = Ticket;
//# sourceMappingURL=Ticket.js.map