import Sequelize, {Model} from 'sequelize'
import database from '../../Database/database'
import Servicio from '../Servicio/Servicio'
import Cotizacion from './Cotizacion'


class CotizacionServicio extends Model{
    id: number;
    cantidad: number;
}
CotizacionServicio.init({
    precio: {
        type: Sequelize.FLOAT(10,2),
        allowNull: false
    },
}, {
    sequelize: database,
    tableName: 'cotizacion'
})

Servicio.belongsToMany(Cotizacion, {
  through: {
    model: CotizacionServicio
  },
  foreignKey: 'servicioId'
})

Cotizacion.belongsToMany(Servicio, {
  through: {
    model: CotizacionServicio
  },
  foreignKey: 'cotizacionId'
})

export default Cotizacion