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
    static async findByCategoriaOuGabinete(nomeGabinete) {

        const sql = `
            SELECT 
                gab.nome_gabinete AS gabinete,
                com.nome_componente AS componente,
                eq.qtde AS Qtde,
                cat.nome_categoria AS categoria
            FROM Categoria cat 
            INNER JOIN componente com 
                ON cat.id_categoria = com.categoria
            INNER JOIN cquipamento eq 
                ON eq.componente = com.codigo_componente
            INNER JOIN cabinete gab 
                ON gab.id_gabinete = eq.gabinete
            WHERE 
                (cat.nome_categoria = "Processamento"
                OR cat.nome_categoria = "Armazenamento")
            AND gab.nome_gabinete LIKE :gab;
        `;

        const [result] = await db.query(sql, {
            replacements: {
                gab: `%${nomeGabinete}%`
            }
        });

        return result;
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