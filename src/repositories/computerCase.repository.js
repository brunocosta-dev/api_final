import Gabinete from '../models/computerCase.model.js';

export default class GabineteRepository{
    static async create(data){
        return await Gabinete.create(data);
    }
    static async findAll(){
        return await Gabinete.findAll();
    }
    static async findByName(nome){
        return await Gabinete.findAll({attributes:['id_componente','nome_componente','desc_componente'],
            include: {model: Categoria, as: 'categoria', attributes: ['nome_categoria']},
            where: {nome_componente: nome}
        });
    }
    static async findById(id){
        return await Gabinete.findByPk(id);
    }
    static async update(id, data){
        await Gabinete.update(data,{where:{id_componente: id}});
        return await Gabinete.findByPk(id);
    }
    static async delete(id){
        return await Gabinete.destroy({where:{id_componente:id}});
    }
}