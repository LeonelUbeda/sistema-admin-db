import Sequelize, {Model} from 'sequelize'
import database from '../../Database/database'
import Usuario from '../Usuario/Usuario'
import Ticket from '../Ticket/Ticket'
import Cliente from '../Cliente';


class Registro extends Model{
    id: number;
    cantidad: number;
}
Registro.init({
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
    esFactura : {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    total: {
      type: Sequelize.FLOAT(12,2),
      allowNull: false
    }
}, {
    sequelize: database,
    tableName: 'registro',
    schema: 'registro'
})

Registro.belongsTo(Ticket, {
  foreignKey: 'ticketId'
})

Registro.belongsTo(Usuario, {
  foreignKey: 'usuario'
})

Registro.belongsTo(Cliente, {
  foreignKey: 'clienteId'
})



export default Registro