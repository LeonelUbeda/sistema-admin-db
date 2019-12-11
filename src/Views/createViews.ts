import database from '../Database/database'
import { syncFactura, dropFactura } from './scripts/vFacturaScript'
import { syncCotizacion, dropCotizacion} from './scripts/vCotizacionScript'
// No se puede utilizar el database.define porque typescript no puede crear una clase a partir de esa funcion.
// Mas informacion https://sequelize.org/master/manual/typescript

const createViews = async () => {
    // factura
    await database.query(dropFactura)
    await database.query(syncFactura)
    await database.query(dropCotizacion)
    await database.query(syncCotizacion)
}

export default createViews