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
const Categoria_1 = __importDefault(require("./Categoria"));
// No se puede utilizar el database.define porque typescript no puede crear una clase a partir de esa funcion.
// Mas informacion https://sequelize.org/master/manual/typescript
class Servicio extends sequelize_1.Model {
}
Servicio.init({
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    categoriaId: {
        type: sequelize_1.default.INTEGER,
        allowNull: false
    },
    nombre: {
        type: sequelize_1.default.STRING(50),
        allowNull: false
    },
    descripcion: {
        type: sequelize_1.default.STRING(200)
    }
}, {
    sequelize: database_1.default,
    modelName: 'servicio',
    schema: 'ticket'
});
Servicio.belongsTo(Categoria_1.default, { foreignKey: 'categoriaId', targetKey: 'id' });
exports.default = Servicio;
//# sourceMappingURL=Servicio.js.map