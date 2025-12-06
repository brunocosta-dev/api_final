import { DataTypes } from "sequelize";
import db from '../config/database.js';
import Category from "./category.model.js";

const Component = db.define('component', {
    id_comp:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING(100), unique:true, allowNull: false},
    desc: {type: DataTypes.STRING(100), allowNull:false},
    id_category: {type: DataTypes.INTEGER, allowNull: false}
},{
    freezeTableName:true
});

Component.associate = (models) =>{
    Component.belongsTo(models.Category,{foreignKey: 'id_category', as: 'category'})
}
export default Component;