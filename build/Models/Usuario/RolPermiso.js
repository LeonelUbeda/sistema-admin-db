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
class Rol extends sequelize_1.Model {
}
exports.Rol = Rol;
Rol.init({
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: sequelize_1.default.STRING(30),
        allowNull: false,
        unique: true
    }
}, {
    sequelize: database_1.default,
    tableName: 'rol',
    schema: 'sistema'
});
class Permiso extends sequelize_1.Model {
}
exports.Permiso = Permiso;
Permiso.init({
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: sequelize_1.default.STRING(30),
        allowNull: false,
        unique: true
    }
}, {
    sequelize: database_1.default,
    tableName: 'permiso',
    schema: 'sistema'
});
class RolPermiso extends sequelize_1.Model {
}
exports.RolPermiso = RolPermiso;
RolPermiso.init({
    nivelAcceso: {
        type: sequelize_1.default.TINYINT,
        validate: {
            min: 0,
            max: 4
        }
    }
}, {
    sequelize: database_1.default,
    tableName: 'rolpermiso',
    schema: 'sistema'
});
Permiso.belongsToMany(Rol, {
    through: {
        model: RolPermiso
    },
    foreignKey: 'permisoId'
});
Rol.belongsToMany(Permiso, {
    through: {
        model: RolPermiso
    },
    foreignKey: 'rolId'
});
//# sourceMappingURL=RolPermiso.js.map