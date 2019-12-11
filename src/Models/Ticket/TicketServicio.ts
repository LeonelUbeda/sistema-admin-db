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
    descripcion: {
        type: Sequelize.STRING(150),
        allowNull: true
    },
    precio: {
        type: Sequelize.FLOAT(12,2),
        allowNull: true
    },
    terminado: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    /*tiempoAproximado: {
        type: Sequelize.INTEGER,
    },*/
    prioridad: {
        type: Sequelize.ENUM('Alta', 'Normal', 'Baja'),
        defaultValue: 'Baja'
    }
}, {
    sequelize: database,
    modelName: 'ticketservicio',
    schema: 'ticket',
    hasTrigger: true
})

Ticket.belongsToMany(Servicio, {through: {
    model: TicketServicio
},
foreignKey: 'ticketId'})
Servicio.belongsToMany(Ticket, {through: {
    model: TicketServicio
},
foreignKey: 'servicioId'})

export default TicketServicio;