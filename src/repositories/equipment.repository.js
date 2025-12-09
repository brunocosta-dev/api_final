import Equipamento from "../models/equipment.model.js";
import QtdeComponentes from "../models/qtdeComponentes.model.js";
import db from '../config/database.js';

async function validarCategoriasComponentes(gabineteId, componenteString){
    const novosComponentes = componenteString
        .split(",")
        .map(id => Number(id.trim()))
        .filter(id => !isNaN(id));

    const equipamentosExistentes = await Equipamento.findAll({
        where: { gabinete: gabineteId },
        attributes: ['componente']
    });
    
    const idsExistentes = equipamentosExistentes.map(eq => eq.componente);

    const todosIds = new Set([...idsExistentes, ...novosComponentes]);
    
    const componentesUnicos = Array.from(todosIds);

    if (componentesUnicos.length === 0) {
        return false;
    }

    const registros = await QtdeComponentes.findAll({
        where: {
            id: componentesUnicos
        },
        attributes: ['id', 'categoria']
    });

    const encontrados = new Set(registros.map(r => r.id));
    const novoIdFaltante = novosComponentes.find(id => !encontrados.has(id));
    
    if (novoIdFaltante) {
        throw new Error(`O componente com ID ${novoIdFaltante} não existe.`);
    }
    
    let possuiProcessamento = false;
    let possuiArmazenamento = false;
    
    for(const registro of registros){
        if(registro.categoria === "Processamento"){
            possuiProcessamento = true;
        } else if(registro.categoria === "Armazenamento"){
            possuiArmazenamento = true;
        }
    };

    return possuiProcessamento && possuiArmazenamento;
};

export default class EquipamentoRepository{
    static async create(data){
        return await Equipamento.create(data);
    }
    static async addComponentesGabinete(idGabinete, componentes, quantidade){
        const valido = await validarCategoriasComponentes(idGabinete, componentes);

        if(!valido) {
            return res.status(400).json({
                erro: "É necessário selecionar ao menos um componente de Processamento e um de Armazenamento"
            });
        };

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