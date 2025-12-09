import { where } from 'sequelize';
import GabineteRepository from '../repositories/computerCase.repository.js';

export async function createGabinete(req, res) {

   try{
        const novoGabinete = await GabineteRepository.create(req.body);
        res.status(201).json({status: "Gabinete adicionado no banco",novoGabinete});
    }catch(error){
        console.error("Erro ao inserir um novo Gabinete:", error);
        res.status(500).json({ error: "Falha ao criar novo gabinete" });
    }
}

export async function searchGabinete(req,res) {
    try{
        const consultarGabinete = await GabineteRepository.findAll();
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
        const GabineteExistente = await GabineteRepository.findById(id);
        
        if(!GabineteExistente){
            return res.status(404).json({erro: "Gabinete não encontrado"});
        }

        await GabineteRepository.update(id, req.body); 

        const GabineteAtualizado = await GabineteRepository.findById(id);

        res.status(200).json(GabineteAtualizado)

    }catch(error){
        console.error(error);
        res.status(500).json({ error: "Falha ao atualizar gabinete" });
    }
}

export async function deleteGabinete(req,res) {
    try{
        
        const {id} = req.params;
        const GabineteExistente = await GabineteRepository.findById(id);
        
        if(!GabineteExistente){
            return res.status(404).json({erro: "Gabinete não encontrado"});
        }

        await GabineteRepository.delete(id); 

        res.status(200).json({menssagem: 'Gabinete deletado com sucesso!'})

    }catch(error){
        console.error(error);
        res.status(500).json({ error: "Falha ao deletar gabinete" });
    }
}