import { DataTypes } from "sequelize";
import db from '../config/database.js';

const Components = db.define('components', {
    id_comp:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING(100), unique:true, allowNull: false},
    desc: {type: DataTypes.STRING(100), allowNull:false},
},{
    freezeTableName:true
});

export default Components;