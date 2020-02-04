import {Sequelize} from 'sequelize'
import dotenv from 'dotenv'
dotenv.config({path: './../.env'})

let database =    process.env.DB_DB
let user =        process.env.DB_USER
let password =    process.env.DB_PASSWORD
let host =        process.env.DB_HOST


const sequelize = new Sequelize(database, user, password, {
    host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        //acquire: 30000,
        idle: 10000
    },
    define: {
        // Evita que modifique el nombre de las tablas. Antes le añadia una 'S'
        freezeTableName: true, 
        timestamps: false
    },
    //logging: true
})



export default sequelize;