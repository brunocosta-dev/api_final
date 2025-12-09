import { where } from 'sequelize';
import ComponenteRepository from '../repositories/component.repository.js';

export async function createComponente(req, res) {

   try{
        const novoComponente = await ComponenteRepository.create(req.body);
        res.status(201).json({status: "Componente adicionado no banco",novoComponente});
    }catch(error){
        console.error("Erro ao inserir um novo componente:", error);
        res.status(500).json({ error: "Falha ao criar componente" });
    }
}

export async function searchComponente(req,res) {
    try{
        const consultarComponente = await ComponenteRepository.findAll();
        res.status(200).json(consultarComponente);
    }catch(error){
        console.error(error);
        res.status(500).json({ error: "Falha ao consultar componentes" });
    }
}

export async function searchNameComponente(req,res) {
    try{
        
        const {nome} = req.params;
        const consultarComponente = await ComponenteRepository.findByName(nome);
        res.status(200).json(consultarComponente);
    }catch(error){
        console.error(error);
        res.status(500).json({ error: "Falha ao consultar componentes" });
    }
}

export async function searchNameGabinete(req,res) {
    try{
        
        const {nome} = req.params;
        const consultarComponente = await ComponenteRepository.findByGabinete(nome);
        res.status(200).json(consultarComponente);
    }catch(error){
        console.error(error);
        res.status(500).json({ error: "Falha ao consultar componentes" });
    }
}

export async function updateComponente(req,res) {
    try{
        
        const {id} = req.params;
        const componenteExistente = await ComponenteRepository.findById(id);
        
        if(!componenteExistente){
            return res.status(404).json({erro: "Componente não encontrado"});
        }

        await ComponenteRepository.update(id,req.body); 

        const componenteAtualizado = await ComponenteRepository.findById(id);

        res.status(200).json(componenteAtualizado)

    }catch(error){
        console.error(error);
        res.status(500).json({ error: "Falha ao atualizar componentes" });
    }
}

export async function deleteComponente(req,res) {
    try{
        
        const {id} = req.params;
        const componenteExistente = await ComponenteRepository.findById(id);
        
        if(!componenteExistente){
            return res.status(404).json({erro: "Componente não encontrado"});
        }

        await ComponenteRepository.delete(id); 

        res.status(200).json({menssagem: 'Componente deletado com sucesso!'})

    }catch(error){
        console.error(error);
        res.status(500).json({ error: "Falha ao deletar componentes" });
    }
}