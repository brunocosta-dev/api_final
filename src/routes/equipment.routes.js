import express from 'express';
import {createEquipamento,searchEquipamento,searchNameEquipamento,updateEquipamento,deleteEquipamento} from '../controllers/equipment.controller'

const router = express.Router();

router.post('/create-equipment',createEquipamento);
router.get('/search-equipment',searchEquipamento);
router.get('/search-equipment/:name',searchNameEquipamento);
router.put('/update-equipment/:id',updateEquipamento);
router.delete('/delete-equipment/:id',deleteEquipamento);