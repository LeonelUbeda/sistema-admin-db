import Sequelize, {Model} from 'sequelize'
import database from '../../Database/database'
import Cliente from '../Cliente'
import Tipo from './Tipo'
import Modelo from './Modelo'
import Version from './Version'


class Vehiculo extends Model{}

Vehiculo.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    versionId: {
        type: Sequelize.INTEGER,
    },
    clienteId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    tipoId: {
        type: Sequelize.INTEGER,
    },
    matricula: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true
    }
}, {
    sequelize: database,
    modelName: 'auto',
    schema: 'vehiculo'
})

Vehiculo.belongsTo(Cliente, {foreignKey: 'clienteId',   targetKey: 'id',onDelete:'SET NULL'})
Vehiculo.belongsTo(Tipo,    {foreignKey: 'tipoId',      targetKey: 'id',onDelete:'SET NULL'})
Vehiculo.belongsTo(Version, {foreignKey: 'versionId',   targetKey: 'id',onDelete:'SET NULL'})


export default Vehiculo