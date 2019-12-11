import database from '../Database/database'
// No se puede utilizar el database.define porque typescript no puede crear una clase a partir de esa funcion.
// Mas informacion https://sequelize.org/master/manual/typescript

const createSchemas = () => {
    database.createSchema('cliente',{logging: false});
    database.createSchema('ticket',{logging: false});
    database.createSchema('registro',{logging: false});
    database.createSchema('sistema',{logging: false});
    database.createSchema('vehiculo',{logging: false});
}

export default createSchemas