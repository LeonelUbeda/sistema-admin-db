import Sequelize, {Model} from 'sequelize'
import database from '../../Database/database'
import Registro from './Registro';


class RegistroDetalle extends Model{
    id: number;
    cantidad: number;
}
RegistroDetalle.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    fechaPago: {
        type: Sequelize.DATE,
        allowNull: false
    },
    anulada: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }

}, {
    sequelize: database,
    tableName: 'registrodetalle',
    schema: 'registro'
})

RegistroDetalle.belongsTo(Registro, {
  foreignKey: 'id'
})



export default RegistroDetalle