import { where } from 'sequelize';
import EquipamentoRepository from '../repositories/equipment.repository.js';

export async function createEquipamento(req, res) {

   try{
    const {gabinete, componentes, quantidades} = req.body    
    const novoEquipamento = await EquipamentoRepository.addComponentesGabinete(gabinete,componentes,quantidades);
        res.status(201).json({status: "Gabinete adicionado no banco",novoEquipamento});
    }catch(error){
        console.error("Erro ao inserir um novo Equipamento:", error);
        res.status(500).json({ error: "Falha ao criar novo Equipamento" });
    }
}

export async function searchEquipamento(req,res) {
    try{
        const consultarEquipamento = await EquipamentoRepository.findAll();
        res.status(200).json(consultarEquipamento);
    }catch(error){
        console.error(error);
        res.status(500).json({ error: "Falha ao consultar Equipamento" });
    }
}

export async function updateEquipamento(req,res) {
    try{
        
        const {idGabinete,idComponente} = req.params;
        const EquipamentoExistente = await EquipamentoRepository.findByGabineteComponente(idGabinete,idComponente);
        
        if(!EquipamentoExistente){
            return res.status(404).json({erro: "Equipamento não encontrado"});
        }

        await EquipamentoRepository.update(idGabinete,idComponente, req.body); 

        const EquipamentoAtualizado = await EquipamentoRepository.findByGabineteComponente(idGabinete,idComponente);

        res.status(200).json(EquipamentoAtualizado)

    }catch(error){
        console.error(error);
        res.status(500).json({ error: "Falha ao atualizar equipamento" });
    }
}

export async function deleteEquipamento(req,res) {
    try{
        
        const {id} = req.params;
        const EquipamentoExistente = await EquipamentoRepository.findById(id);
        
        if(!EquipamentoExistente){
            return res.status(404).json({erro: "Equipamento não encontrado"});
        }

        await EquipamentoRepository.delete(id); 

        res.status(200).json({menssagem: 'Equipamento deletado com sucesso!'})

    }catch(error){
        console.error(error);
        res.status(500).json({ error: "Falha ao deletar Equipamento" });
    }
}