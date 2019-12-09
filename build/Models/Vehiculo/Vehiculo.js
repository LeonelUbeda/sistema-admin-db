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
const Tipo_1 = __importDefault(require("./Tipo"));
const Modelo_1 = __importDefault(require("./Modelo"));
const Version_1 = __importDefault(require("./Version"));
class Vehiculo extends sequelize_1.Model {
}
Vehiculo.init({
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    modeloId: {
        type: sequelize_1.default.INTEGER,
        allowNull: false
    },
    versionId: {
        type: sequelize_1.default.INTEGER,
        allowNull: true
    },
    clienteId: {
        type: sequelize_1.default.INTEGER,
        allowNull: false
    },
    tipoId: {
        type: sequelize_1.default.INTEGER,
        allowNull: true
    },
    matricula: {
        type: sequelize_1.default.STRING(30),
        allowNull: false,
        unique: true
    }
}, {
    sequelize: database_1.default,
    modelName: 'auto',
    schema: 'vehiculo'
});
Vehiculo.belongsTo(Cliente_1.default, { foreignKey: 'clienteId', targetKey: 'id' });
Vehiculo.belongsTo(Tipo_1.default, { foreignKey: 'tipoId', targetKey: 'id' });
Vehiculo.belongsTo(Modelo_1.default, { foreignKey: 'modeloId', targetKey: 'id' });
Vehiculo.belongsTo(Version_1.default, { foreignKey: 'versionId', targetKey: 'id' });
exports.default = Vehiculo;
//# sourceMappingURL=Vehiculo.js.map