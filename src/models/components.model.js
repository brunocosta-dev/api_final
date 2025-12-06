import { DataTypes } from "sequelize";
import db from '../config/database.js';

const Components = db.define('component', {
    id_comp:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING(100), unique:true, allowNull: false},
    desc: {type: DataTypes.STRING(100), allowNull:false},
    id_category: {type: DataTypes.INTEGER, allowNull: false}
},{
    freezeTableName:true
});

Components.associate = (models) =>{
    Components.belongsTo(models.Category,{foreignKey: 'id_category', as: 'category'})
}
export default Components;