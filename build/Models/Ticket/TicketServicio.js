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
const Ticket_1 = __importDefault(require("./Ticket"));
const Servicio_1 = __importDefault(require("../Servicio/Servicio"));
class TicketServicio extends sequelize_1.Model {
}
TicketServicio.init({
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ticketId: {
        type: sequelize_1.default.INTEGER,
        allowNull: false
    },
    servicioId: {
        type: sequelize_1.default.INTEGER,
        allowNull: false
    },
    precio: {
        type: sequelize_1.default.FLOAT(12, 2),
        allowNull: true
    },
    tiempoAproximado: {
        type: sequelize_1.default.INTEGER,
    },
    prioridad: {
        type: sequelize_1.default.ENUM('Alta', 'Media', 'Baja'),
        defaultValue: 'Baja'
    }
}, {
    sequelize: database_1.default,
    modelName: 'ticketservicio',
    schema: 'ticket'
});
TicketServicio.belongsTo(Ticket_1.default, { foreignKey: 'ticketId', targetKey: 'id' });
TicketServicio.belongsTo(Servicio_1.default, { foreignKey: 'servicioId', targetKey: 'id' });
exports.default = Ticket_1.default;
//# sourceMappingURL=TicketServicio.js.map