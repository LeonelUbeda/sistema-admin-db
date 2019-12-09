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
const Usuario_1 = __importDefault(require("../Usuario/Usuario"));
class Insumo extends sequelize_1.Model {
}
exports.Insumo = Insumo;
Insumo.init({
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: sequelize_1.default.STRING(30),
        allowNull: false
    },
    cantidad: {
        type: sequelize_1.default.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: 0
        }
    }
}, {
    sequelize: database_1.default,
    tableName: 'insumo'
});
class UnidadDeMedida extends sequelize_1.Model {
}
exports.UnidadDeMedida = UnidadDeMedida;
UnidadDeMedida.init({
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
    tableName: 'unidaddemedida'
});
UnidadDeMedida.hasMany(Insumo);
class MovimientoInsumo extends sequelize_1.Model {
}
exports.MovimientoInsumo = MovimientoInsumo;
MovimientoInsumo.init({
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cantidad: {
        type: sequelize_1.default.INTEGER,
        allowNull: false,
        validate: {
            min: 0
        }
    },
    tipo: {
        type: sequelize_1.default.ENUM('entrada', 'salida'),
        allowNull: false
    },
    fecha: {
        type: sequelize_1.default.DATE,
        allowNull: false,
        defaultValue: sequelize_1.default.NOW
    },
    razon: {
        type: sequelize_1.default.STRING(144),
    }
}, {
    sequelize: database_1.default,
    tableName: 'movimientoinsumo'
});
Usuario_1.default.hasMany(MovimientoInsumo, {
    foreignKey: 'usuario'
});
Insumo.hasMany(MovimientoInsumo, {
    foreignKey: 'insumoId'
});
//# sourceMappingURL=Insumo.js.map