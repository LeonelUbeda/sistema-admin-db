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
// No se puede utilizar el database.define porque typescript no puede crear una clase a partir de esa funcion.
// Mas informacion https://sequelize.org/master/manual/typescript
class Cliente extends sequelize_1.Model {
}
Cliente.init({
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: sequelize_1.default.STRING(50),
        allowNull: false
    },
    apellido: {
        type: sequelize_1.default.STRING(50)
    },
    cedula: {
        type: sequelize_1.default.STRING(30),
        allowNull: true
    },
    direccion: {
        type: sequelize_1.default.STRING(100)
    },
    tipoCliente: {
        type: sequelize_1.default.ENUM({
            values: ['Persona', 'Empresa']
        }),
        defaultValue: 'Persona'
    }
}, {
    sequelize: database_1.default,
    modelName: 'cliente',
    schema: 'cliente'
});
exports.default = Cliente;
//# sourceMappingURL=Cliente.js.map