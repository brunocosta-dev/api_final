import Equipamento from "../models/equipment.model.js";
import QtdeComponentes from "../models/qtdeComponentes.model.js";
import db from '../config/database.js';

export default class EquipamentoRepository{
    static async create(data){
        return await Equipamento.create(data);
    }
    static async addComponentesGabinete(idGabinete, componentes, quantidade){
        const compStr = Array.isArray(componentes) ? componentes.join(',') : componentes;
        const qtdeStr = Array.isArray(quantidades) ? quantidades.join(',') : quantidades;
        await db.query('CALL add_componentes_gabinete(:gabinete, :componentes, :quantidades)',{
            replacements:{
                gabinete: idGabinete,
                componentes: compStr,
                quantidades: qtdeStr   
            }
        })
    }
    static async findAll(){
        return await QtdeComponentes.findAll();
    }
    static async findById(id){
        return await Equipamento.findByPk(id);
    }
    static async update(id, data){
        await Equipamento.update(data,{where:{id_componente: id}});
        return await Equipamento.findByPk(id);
    }
    static async delete(id){
        return await Equipamento.destroy({where:{id_componente:id}});
    }
}