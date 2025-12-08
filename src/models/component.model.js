import { DataTypes } from "sequelize";
import db from '../config/database.js';

const Componente = db.define('componente', {
    id_componente:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    nome_componente: {type: DataTypes.STRING(100), unique:true, allowNull: false},
    desc_componente: {type: DataTypes.STRING(100)},
    id_categoria: {type: DataTypes.INTEGER, allowNull: false}
},{
    freezeTableName:true
});

Componente.associate = (models) =>{
    Componente.belongsTo(models.Categoria,{foreignKey: 'id_categoria', as: 'categoria'})
    Componente.belongsToMany(models.Gabinete, {through: models.Equipamento,foreignKey: 'id_componente', otherKey: 'id_gabinete', as: 'gabinete'});
}
export default Componente;