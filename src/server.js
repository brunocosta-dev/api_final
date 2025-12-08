import express from 'express';
import dotenv from 'dotenv';
import db from './config/database.js';
import Models from './models/models.js';
import componenteRota from "./routes/component.routes.js"

dotenv.config();

const server = express();
server.use(express.json());

try{
    await db.authenticate();
    console.log('Connection has been estabelished successfully.');
}catch (error) {
    console.error('Unable to connect to the database:', error.message);
    process.exit(1);
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, ()=>console.log(`server running at http://localhost:${PORT}`));

server.use(componenteRota);