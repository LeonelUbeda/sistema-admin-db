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
const RepuestoCliente_1 = __importDefault(require("./RepuestoCliente"));
class Nota extends sequelize_1.Model {
}
Nota.init({
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ticketId: {
        type: sequelize_1.default.INTEGER,
        allowNull: false
    },
    nota: {
        type: sequelize_1.default.STRING(255),
        allowNull: false
    },
    publico: {
        type: sequelize_1.default.BOOLEAN,
        defaultValue: true
    }
}, {
    sequelize: database_1.default,
    modelName: 'nota',
    schema: 'ticket'
});
Nota.belongsTo(RepuestoCliente_1.default, { foreignKey: 'ticketId', targetKey: 'id' });
exports.default = Nota;
//# sourceMappingURL=Nota.js.map