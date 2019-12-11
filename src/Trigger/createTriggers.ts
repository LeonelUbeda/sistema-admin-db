import database from '../Database/database'
import { syncSumaServicios, dropSumaServicios } from './scripts/SumaServicios'
import { syncMarcarFinalizado, dropMarcarFinalizado } from './scripts/MarcarFinalizado'
import { syncBorrarTicket, dropBorrarTicket } from './scripts/BorrarTicket'
// No se puede utilizar el database.define porque typescript no puede crear una clase a partir de esa funcion.
// Mas informacion https://sequelize.org/master/manual/typescript

const createViews = async () => {
    // anular
    await database.query(dropSumaServicios)
    await database.query(syncSumaServicios)
    await database.query(dropMarcarFinalizado)
    await database.query(syncMarcarFinalizado)
    //await database.query(dropBorrarTicket)
    //await database.query(syncBorrarTicket)
}

export default createViews