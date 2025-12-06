import express from 'express';


const router = express.Router();

router.post('/create-computer_case');
router.get('/search-computer_case');
router.get('/search-computer_case/:name');
router.put('/update-computer_case/:id');
router.delete('/delete-computer_case/:id');