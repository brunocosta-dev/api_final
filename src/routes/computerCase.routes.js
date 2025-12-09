import express from 'express';
import {
    createGabinete,
    searchGabinete,
    searchNameGabinete,
    updateGabinete,
    deleteGabinete,
    searchCategoryGabinete
} from '../controllers/computerCase.controller.js'

const router = express.Router();

router.post('/create-computer_case',createGabinete);
router.get('/search-computer_case',searchGabinete);
router.get('/search-computer_case/:nome',searchNameGabinete);
router.get('/search-computer_case_category/:nome',searchCategoryGabinete);
router.put('/update-computer_case/:id', updateGabinete);
router.delete('/delete-computer_case/:id', deleteGabinete);

searchCategoryGabinete

export default router;