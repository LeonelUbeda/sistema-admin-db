import Sequelize, {Model} from 'sequelize'
import database from '../../Database/database'
import Usuario from './Usuario'



class Rol extends Model{}
Rol.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true
    }
}, {
    sequelize: database,
    tableName: 'rol',
    schema: 'sistema'
})



class Permiso extends Model{}
Permiso.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true
    }
}, {
    sequelize: database,
    tableName: 'permiso',
    schema: 'sistema'
})




class RolPermiso extends Model{}

RolPermiso.init({
    nivelAcceso: {
        type: Sequelize.TINYINT,
        validate: {
            min: 0,
            max: 4
        }
    }
}, {
    sequelize: database,
    tableName: 'rolpermiso',
    schema: 'sistema'
})


Permiso.belongsToMany(Rol, {
    through: {
        model: RolPermiso
    },
    foreignKey: 'permisoId'
})


Rol.belongsToMany(Permiso, {
    through: {
        model: RolPermiso
    },
    foreignKey: 'rolId'
    
})


export {RolPermiso, Rol, Permiso}