import { DataTypes } from "sequelize";
import db from '../config/database.js';

const Equipamento = db.define('equipamento', {
    qtde:{type: DataTypes.INTEGER, allowNull:false, defaultValue:1},
    id_componente: {type: DataTypes.INTEGER, allowNull: false, primaryKey: true, references: {model:'componente', key: 'id_componente'}},
    id_gabinete: {type: DataTypes.INTEGER, allowNull: false, primaryKey: true, references: {model:'gabinete', key: 'id_gabinete'}}
},{
    freezeTableName:true,
    timestamps: false
});

export default Equipamento;