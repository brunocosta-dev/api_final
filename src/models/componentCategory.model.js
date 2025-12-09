import { DataTypes } from "sequelize";
import db from '../config/database.js';

const ComponeteCategoria = db.define('componente', {
    Codigo:{type: DataTypes.INTEGER, primaryKey: true},
    NomeComponente: {type: DataTypes.STRING, field:'Componente'},
    Descricao: {type: DataTypes.STRING},
    Categoria: {type: DataTypes.STRING},
},{
    freezeTableName:true,
    timestamps: false,
    tableName: 'componente_categoria'
});

export default ComponeteCategoria;