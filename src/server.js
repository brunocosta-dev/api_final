import express from 'express';
import db from './config/database.js';
import models from './models/models.js';

const server = express();
server.use(express.json());

try{
    await db.authenticate();
    console.log('Connection has been estabelished successfully.');
}catch  {
    console.error('Unable to connect to the database:',error);
}

server.listen(3000, ()=>console.log('server running at http://localhost:3000'))