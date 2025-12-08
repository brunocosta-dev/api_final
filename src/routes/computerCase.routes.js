import express from 'express';
import {
    createGabinete,
    searchGabinete,
    searchNameGabinete,
    updateGabinete,
    deleteGabinete
} from '../controllers/computerCase.controller.js'

const router = express.Router();

router.post('/create-computer_case',createGabinete);
router.get('/search-computer_case',searchGabinete);
router.get('/search-computer_case/:name',searchNameGabinete);
router.put('/update-computer_case/:id', updateGabinete);
router.delete('/delete-computer_case/:id', deleteGabinete);

export default router;