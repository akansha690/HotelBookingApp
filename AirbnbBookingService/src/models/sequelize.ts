import dotenv from 'dotenv';
import {Sequelize} from 'sequelize';

dotenv.config();

const sequelize = new Sequelize({

    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: 'mysql'

})

export default sequelize;
