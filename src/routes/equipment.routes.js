import express from 'express';
import {createEquipamento,searchEquipamento,updateEquipamento,deleteEquipamento} from '../controllers/equipment.controller'

const router = express.Router();

router.post('/create-equipment',createEquipamento);
router.get('/search-equipment',searchEquipamento);
router.put('/update-equipment/:id',updateEquipamento);
router.delete('/delete-equipment/:id',deleteEquipamento);