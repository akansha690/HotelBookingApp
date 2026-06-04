import dotenv from 'dotenv';
import {Sequelize} from 'sequelize';

dotenv.config();

console.log('DB_USER in sequelize file:', process.env.DB_USER);
console.log('DB_PASSWORD in sequelize file:', process.env.DB_PASSWORD ? 'set' : 'NOT SET');
console.log('DB_HOST in sequelize file:', process.env.DB_HOST);

const sequelize = new Sequelize({

    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: 'mysql'

})

export default sequelize;
