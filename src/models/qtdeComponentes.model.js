import { DataTypes } from "sequelize";
import db from '../config/database.js';

const QtdeComponentes = db.define('componente', {
    Cod_Gabinete:{type: DataTypes.INTEGER, primaryKey: true},
    Nome: {type: DataTypes.STRING},
    Total_Componentes: {type: DataTypes.DECIMAL},
},{
    freezeTableName:true,
    timestamps: false,
    tableName: 'qtde_componentes'
});

export default QtdeComponentes;