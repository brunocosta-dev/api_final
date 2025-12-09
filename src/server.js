import express from 'express';
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";
import db from './config/database.js';
import Models from './models/models.js';
import componenteRota from "./routes/component.routes.js";
import gabineteRota from './routes/computerCase.routes.js';
import equipamentoRota from './routes/equipment.routes.js';

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;


console.log("\nValidando token enviado pelo iniciar.js...");

const token = process.env.AUTH_TOKEN;

if (!token) {
    console.log("Nenhum token recebido. O servidor será encerrado.");
    process.exit(1);
}

try {
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log("Token válido! Usuário autenticado:", decoded.username);
    console.log("Iniciando servidor...\n");
} catch (err) {
    console.log("Token inválido ou expirado.");
    process.exit(1);
}


const server = express();
server.use(express.json());


try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error.message);
    process.exit(1);
}


server.use(componenteRota);
server.use(gabineteRota);
server.use(equipamentoRota);


const PORT = process.env.PORT || 3000;
server.listen(PORT, () =>
    console.log(`🚀 Server running at http://localhost:${PORT}`)
);
