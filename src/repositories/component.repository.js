import Componente from '../models/component.model.js';
import ComponeteCategoria from '../models/componentCategory.model.js';
import Categoria from '../models/category.model.js'
import db from '../config/database.js'

export default class ComponenteRepository{
    static async create(data){
        return await Componente.create(data);
    }
    static async findAll(){
        return await ComponeteCategoria.findAll();
    }
    static async findByName(nome){
        return await Componente.findAll({attributes:['id_componente','nome_componente','desc_componente'],
            include: {model: Categoria, as: 'categoria', attributes: ['nome_categoria']},
            where: {nome_componente: nome}
        });
    }
    static async findByGabinete(nome){
        const sql = `SELECT com.id_componente,com.nome_componente,com.desc_componente,gab.nome_gabinete
        FROM componente com INNER JOIN equipamento eq on eq.id_componente = com.id_componente
        INNER JOIN gabinete gab on gab.id_gabinete = eq.id_gabinete
        WHERE gab.nome_gabinete LIKE :nome;
        `;
        const [result] = await db.query(sql,{replacements:{nome: `%${nome}`}});
        return result;
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
