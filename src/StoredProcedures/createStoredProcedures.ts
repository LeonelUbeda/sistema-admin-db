import database from '../Database/database'
import { syncAnularFactura, dropAnularFactura } from './scripts/AnularFactura'
// No se puede utilizar el database.define porque typescript no puede crear una clase a partir de esa funcion.
// Mas informacion https://sequelize.org/master/manual/typescript

const createViews = async () => {
    // anular
    await database.query(dropAnularFactura)
    await database.query(syncAnularFactura)
}

export default createViews