import express from 'express';
import {createComponente,searchComponente,searchNameComponente,updateComponente} from '../controllers/component.controller.js' 

const router = express.Router();

router.post('/create-components', createComponente);
router.get('/search-components',searchComponente);
router.get('/search-components/:nome',searchNameComponente);
router.put('/update-components/:id', updateComponente);
//router.delete('/delete-components/:id');

export default router;