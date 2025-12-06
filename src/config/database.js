import { Sequelize } from "sequelize";

const db = new Sequelize('loja_computadores','root','root',{
    host: 'localhost',
    dialect: 'mysql',
});

export default db;