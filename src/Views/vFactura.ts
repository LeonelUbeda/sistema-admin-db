import Sequelize, {Model} from 'sequelize'
import database from '../Database/database'


class vFactura extends Model{
    id: number;
    cantidad: number;
}
const x = vFactura.init({
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
    fechaPago: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    anulada : {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
    tableName: 'vFactura'
})


vFactura.sync = async function (options?: Sequelize.SyncOptions) {
    
 };

 vFactura.drop = async function(options?: Sequelize.SyncOptions) {

 }

 

export default vFactura