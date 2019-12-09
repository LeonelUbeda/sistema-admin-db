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
const Modelo_1 = __importDefault(require("./Modelo"));
// No se puede utilizar el database.define porque typescript no puede crear una clase a partir de esa funcion.
// Mas informacion https://sequelize.org/master/manual/typescript
class Version extends sequelize_1.Model {
}
Version.init({
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    modeloId: {
        type: sequelize_1.default.INTEGER,
        allowNull: false
    },
    nombre: {
        type: sequelize_1.default.STRING(50),
        allowNull: false
    }
}, {
    sequelize: database_1.default,
    modelName: 'version',
    schema: 'vehiculo'
});
Version.belongsTo(Modelo_1.default, { foreignKey: 'modeloId', targetKey: 'id' });
exports.default = Version;
//# sourceMappingURL=Version.js.map