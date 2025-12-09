import Equipamento from "../models/equipment.model.js";

export default class EquipamentoRepository{
    static async create(data){
        return await Equipamento.create(data);
    }
    static async findAll(){
        return await Equipamento.findAll();
    }
    static async findByName(nome){
        return await Equipamento.findAll({attributes:['id_componente','nome_componente','desc_componente'],
            include: {model: Categoria, as: 'categoria', attributes: ['nome_categoria']},
            where: {nome_componente: nome}
        });
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