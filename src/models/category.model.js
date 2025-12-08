import { DataTypes } from "sequelize";
import db from '../config/database.js';

const Categoria = db.define('categoria', {
    id_categoria:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    nome_categoria: {type: DataTypes.STRING(100), unique:true, allowNull: false},
},{
    freezeTableName:true
});

Categoria.associate = (models) =>{
    Categoria.hasMany(models.Componente,{foreignKey: 'id_categoria', as: 'componente'})
}

export default Categoria;