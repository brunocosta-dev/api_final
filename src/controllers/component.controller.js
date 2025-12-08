import { where } from 'sequelize';
import Componente from '../models/component.model.js'

export async function createComponente(req, res) {

   try{
        const novoComponente = await Componente.create(req.body);
        res.status(201).json({status: "Componente adicionado no banco",novoComponente});
    }catch(error){
        console.error("Erro ao inserir um novo componente:", error);
        res.status(500).json({ error: "Falha ao criar componente" });
    }
}

export async function searchComponente(req,res) {
    try{
        const consultarComponente = await Componente.findAll();
        res.status(200).json(consultarComponente);
    }catch(error){
        console.error(error);
        res.status(500).json({ error: "Falha ao consultar componentes" });
    }
}

export async function searchNameComponente(req,res) {
    try{
        
        const {nome} = req.params;
        const consultarComponente = await Componente.findAll({where:{nome_componente: nome}});
        res.status(200).json(consultarComponente);
    }catch(error){
        console.error(error);
        res.status(500).json({ error: "Falha ao consultar componentes" });
    }
}

export async function updateComponente(req,res) {
    try{
        
        const {id} = req.params;
        const componenteExistente = await Componente.findByPk(id);
        
        if(!componenteExistente){
            return res.status(404).json({erro: "Componente não encontrado"});
        }

        await Componente.update(req.body, {where: {id_componente: id}}); 

        const componenteAtualizado = await Componente.findByPk(id);

        res.status(200).json(componenteAtualizado)

    }catch(error){
        console.error(error);
        res.status(500).json({ error: "Falha ao atualizar componentes" });
    }
}