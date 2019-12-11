import Sequelize, {Model} from 'sequelize'
import database from '../../Database/database'
import Ticket from './Ticket';

class RepuestoCliente extends Model{}

RepuestoCliente.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ticketId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    nombre: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    descripcion: {
        type: Sequelize.STRING(255)
    },
    cantidad: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    sequelize: database,
    modelName: 'repuestocliente',
    schema: 'ticket'
})

RepuestoCliente.belongsTo(Ticket, {foreignKey: 'ticketId', targetKey: 'id'})

export default Ticket;