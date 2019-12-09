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
class Herramienta extends sequelize_1.Model {
}
exports.Herramienta = Herramienta;
Herramienta.init({
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
    tableName: 'herramienta'
});
class Categoria extends sequelize_1.Model {
}
exports.Categoria = Categoria;
Categoria.init({
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
    tableName: 'categoriah'
});
Categoria.hasMany(Herramienta, {
    foreignKey: "categoriaId"
});
class MovimientoHerramienta extends sequelize_1.Model {
}
exports.MovimientoHerramienta = MovimientoHerramienta;
MovimientoHerramienta.init({
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tipo: {
        type: sequelize_1.default.ENUM('entrada', 'salida'),
        allowNull: false
    },
    cantidad: {
        type: sequelize_1.default.INTEGER,
        allowNull: false,
        validate: {
            min: 0
        }
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
    tableName: 'movimientoherramienta'
});
Herramienta.hasMany(MovimientoHerramienta, {
    foreignKey: 'herramientaId'
});
Usuario_1.default.hasMany(MovimientoHerramienta, {
    foreignKey: 'usuario'
});
//# sourceMappingURL=Herramienta.js.map