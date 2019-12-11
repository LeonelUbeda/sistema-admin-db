import Sequelize, {Model} from 'sequelize'
import database from '../../Database/database'
import Cliente from '../Cliente';



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
    clienteId: {
        type: Sequelize.INTEGER
    }
}, {
    sequelize: database,
    tableName: 'cotizacion',
    schema: 'ventas'
})

Cliente.hasMany(Cotizacion, {
  foreignKey: 'clienteId'
})

export default Cotizacion