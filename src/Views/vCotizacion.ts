import Sequelize, {Model} from 'sequelize'
import database from '../Database/database'


class vCotizacion extends Model{
    id: number;
    cantidad: number;
}
const x = vCotizacion.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fechaCreacion: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    validoHasta: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    total: {
      type: Sequelize.FLOAT(12,2),
      allowNull: false
    },
    ticketId : {
        type: Sequelize.INTEGER
    },
    clienteId: {
        type: Sequelize.INTEGER
    },
    usuario: {
        type: Sequelize.STRING(30)
    },
    cliente: {
        type: Sequelize.STRING(100)
    },
    cantidadServicios : {
        type: Sequelize.INTEGER
    }
}, {
    sequelize: database,
    tableName: 'vCotizacion'
})


vCotizacion.sync = async function (options?: Sequelize.SyncOptions) {
    
 };

 vCotizacion.drop = async function(options?: Sequelize.SyncOptions) {

 }

 

export default vCotizacion