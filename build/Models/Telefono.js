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
const database_1 = __importDefault(require("../Database/database"));
const Cliente_1 = __importDefault(require("./Cliente"));
class Telefono extends sequelize_1.Model {
}
Telefono.init({
    clienteId: {
        type: sequelize_1.default.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    telefono: {
        type: sequelize_1.default.STRING(15),
        allowNull: false,
        primaryKey: true
    }
}, {
    sequelize: database_1.default,
    modelName: 'telefono',
    schema: 'cliente'
});
Telefono.belongsTo(Cliente_1.default, { foreignKey: 'clienteId', targetKey: 'id' });
exports.default = Telefono;
//# sourceMappingURL=Telefono.js.map