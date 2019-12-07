import Sequelize, {Model} from 'sequelize'
import database from '../../Database/database'
import Usuario from '../Usuario/Usuario'
import Ticket from '../Ticket/Ticket'
import Cliente from '../Cliente';




class Factura extends Model{
    id: number;
    cantidad: number;
}
Factura.init({
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
    },
    aplicarDescuento: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    total: {
      type: Sequelize.FLOAT(12,2),
      allowNull: false
    }
}, {
    sequelize: database,
    tableName: 'factura',
    schema: 'ventas'
})

Factura.belongsTo(Ticket, {
  foreignKey: 'ticketId'
})

Factura.belongsTo(Usuario, {
  foreignKey: 'usuario'
})

Factura.belongsTo(Cliente, {
  foreignKey: 'clienteId'
})

export default Factura