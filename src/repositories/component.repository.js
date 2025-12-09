import Componente from '../models/component.model.js';
import Categoria from '../models/category.model.js'

export default class ComponenteRepository{
    static async create(data){
        return await Componente.create(data);
    }
    static async findAll(){
        return await Componente.findAll();
    }
    static async findByName(nome){
        return await Componente.findAll({attributes:['id_componente','nome_componente','desc_componente'],
            include: {model: Categoria, as: 'categoria', attributes: ['nome_categoria']},
            where: {nome_componente: nome}
        });
    }
    static async findById(id){
        return await Componente.findByPk(id);
    }
    static async update(id, data){
        await Componente.update(data,{where:{id_componente: id}});
        return await Componente.findByPk(id);
    }
    static async delete(id){
        return await Componente.destroy({where:{id_componente:id}});
    }
}
