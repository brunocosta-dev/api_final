import { DataTypes } from "sequelize";
import db from '../config/database.js';

const Gabinete = db.define('gabinete', {
    id_gabinete:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    nome_gabinete: {type: DataTypes.STRING(100), allowNull:false, unique: true},
},{
    freezeTableName:true
});
Gabinete.associate = (models) =>{
    Gabinete.belongsToMany(models.Componente, {through: models.Equipamento,foreignKey: 'id_gabinete', otherKey: 'id_componente', as: 'componente'});
}

export default Gabinete;