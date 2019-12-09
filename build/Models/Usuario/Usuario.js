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
const RolPermiso_1 = require("./RolPermiso");
class Usuario extends sequelize_1.Model {
}
Usuario.init({
    usuario: {
        type: sequelize_1.default.STRING(30),
        allowNull: false,
        primaryKey: true
    },
    rolId: {
        type: sequelize_1.default.INTEGER,
        allowNull: true
    },
    nombre: {
        type: sequelize_1.default.STRING(50),
        allowNull: false
    },
    apellido: {
        type: sequelize_1.default.STRING(50)
    },
    contrasena: {
        type: sequelize_1.default.STRING(64),
        allowNull: false
    }
}, {
    sequelize: database_1.default,
    tableName: 'usuario',
    schema: 'sistema'
});
Usuario.belongsTo(RolPermiso_1.Rol, {
    foreignKey: {
        allowNull: false,
        name: 'rolId'
    },
    constraints: true
});
exports.default = Usuario;
//# sourceMappingURL=Usuario.js.map