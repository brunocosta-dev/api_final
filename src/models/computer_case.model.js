import { DataTypes } from "sequelize";
import db from '../config/database.js';

const Computer_Case = db.define('computer_case', {
    id_case:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    desc: {type: DataTypes.STRING(100), allowNull:false},
},{
    freezeTableName:true
});

export default Computer_Case;