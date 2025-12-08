import { where } from 'sequelize';
import Gabinete from '../models/computerCase.model.js'

export async function createGabinete(req, res) {

   try{
        const novoGabinete = await Gabinete.create(req.body);
        res.status(201).json({status: "Gabinete adicionado no banco",novoGabinete});
    }catch(error){
        console.error("Erro ao inserir um novo Gabinete:", error);
        res.status(500).json({ error: "Falha ao criar novo gabinete" });
    }
}

export async function searchGabinete(req,res) {
    try{
        const consultarGabinete = await Gabinete.findAll();
        res.status(200).json(consultarGabinete);
    }catch(error){
        console.error(error);
        res.status(500).json({ error: "Falha ao consultar gabinetes" });
    }
}

export async function searchNameGabinete(req,res) {
    try{
        
        const {nome} = req.params;
        const consultarGabinete = await Gabinete.findAll({where:{nome_gabinete: nome}});
        res.status(200).json(consultarGabinete);
    }catch(error){
        console.error(error);
        res.status(500).json({ error: "Falha ao consultar gabinete" });
    }
}

export async function updateGabinete(req,res) {
    try{
        
        const {id} = req.params;
        const GabineteExistente = await Gabinete.findByPk(id);
        
        if(!GabineteExistente){
            return res.status(404).json({erro: "Gabinete não encontrado"});
        }

        await Gabinete.update(req.body, {where: {id_Gabinete: id}}); 

        const GabineteAtualizado = await Gabinete.findByPk(id);

        res.status(200).json(GabineteAtualizado)

    }catch(error){
        console.error(error);
        res.status(500).json({ error: "Falha ao atualizar gabinete" });
    }
}

export async function deleteGabinete(req,res) {
    try{
        
        const {id} = req.params;
        const GabineteExistente = await Gabinete.findByPk(id);
        
        if(!GabineteExistente){
            return res.status(404).json({erro: "Gabinete não encontrado"});
        }

        await Gabinete.destroy({where: {id_Gabinete: id}}); 

        res.status(200).json({menssagem: 'Gabinete deletado com sucesso!'})

    }catch(error){
        console.error(error);
        res.status(500).json({ error: "Falha ao deletar gabinete" });
    }
}