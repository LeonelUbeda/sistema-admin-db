import Sequelize, {Model} from 'sequelize'
import database from '../../Database/database'
import Cliente from '../Cliente'
import Vehiculo from '../Vehiculo/Vehiculo'
import Ticket from './Ticket';
import Servicio from '../Servicio/Servicio';

class TicketServicio extends Model{}
TicketServicio.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ticketId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    servicioId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    precio: {
        type: Sequelize.FLOAT(12,2),
        allowNull: true
    },
    tiempoAproximado: {
        type: Sequelize.INTEGER,
    },
    prioridad: {
        type: Sequelize.ENUM('Alta', 'Media', 'Baja'),
        defaultValue: 'Baja'
    }
}, {
    sequelize: database,
    modelName: 'ticketservicio'
})

TicketServicio.belongsTo(Ticket, {foreignKey: 'ticketId', targetKey: 'id'})
TicketServicio.belongsTo(Servicio, {foreignKey: 'servicioId', targetKey: 'id'})

export default Ticket;