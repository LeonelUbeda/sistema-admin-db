"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../Database/database"));
// No se puede utilizar el database.define porque typescript no puede crear una clase a partir de esa funcion.
// Mas informacion https://sequelize.org/master/manual/typescript
const createSchemas = () => {
    database_1.default.createSchema('cliente', { logging: false });
    database_1.default.createSchema('ticket', { logging: false });
    database_1.default.createSchema('ventas', { logging: false });
    database_1.default.createSchema('sistema', { logging: false });
    database_1.default.createSchema('vehiculo', { logging: false });
};
exports.default = createSchemas;
//# sourceMappingURL=Schemas.js.map