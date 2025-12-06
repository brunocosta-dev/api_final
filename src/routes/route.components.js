import express from 'express';


const router = express.Router();

router.post('/create-components');
router.get('/search-components');
router.get('/search-components/:name');
router.put('/update-components/:id');
router.delete('/delete-components/:id');
