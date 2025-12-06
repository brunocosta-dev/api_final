import { DataTypes } from "sequelize";
import db from '../config/database.js';

const Category = db.define('category', {
    id_category:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING(100), unique:true, allowNull: false},
},{
    freezeTableName:true
});

Category.associate = (models) =>{
    Category.hasMany(models.Component,{foreignKey: 'id_category', as: 'components'})
}

export default Category;