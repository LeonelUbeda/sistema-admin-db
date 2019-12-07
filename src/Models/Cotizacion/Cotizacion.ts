import Sequelize, {Model} from 'sequelize'
import database from '../../Database/database'
import Usuario from '../Usuario/Usuario'



class Cotizacion extends Model{
    id: number;
    cantidad: number;
}
Cotizacion.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fechaCreacion: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    validoHasta: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
}, {
    sequelize: database,
    tableName: 'cotizacion',
    schema: 'ventas'
})

Usuario.hasMany(Cotizacion, {
  foreignKey: 'clienteId'
})

export default Cotizacion