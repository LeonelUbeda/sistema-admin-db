import Sequelize, {Model} from 'sequelize'
import database from '../Database/database'

// No se puede utilizar el database.define porque typescript no puede crear una clase a partir de esa funcion.
// Mas informacion https://sequelize.org/master/manual/typescript

class Cliente extends Model{
}
Cliente.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    apellido: {
        type: Sequelize.STRING(50)
    },
    cedula: {
        type: Sequelize.STRING(30),
        allowNull: true
    },
    direccion: {
        type: Sequelize.STRING(100)
    },
    tipoCliente: {
        type: Sequelize.ENUM({
            values:['Persona', 'Empresa']
        }),
        defaultValue: 'Persona'
    }
    
}, {
    sequelize: database,
    modelName: 'cliente',
    schema: 'cliente'
})



export default Cliente;