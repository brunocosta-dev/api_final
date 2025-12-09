import readline from "readline";
import { spawn } from "child_process";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs/promises";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Caminho para o server
const SERVER_PATH = join(__dirname, "src/server.js");
// Caminho dos usuários
const USERS_PATH = join(__dirname, "users.json");

const SECRET_KEY = process.env.SECRET_KEY;

console.clear();
console.log("Sistema de Autenticação");
console.log("Só será possível iniciar o servidor após login válido.\n");

rl.question("Usuário: ", (username) => {
  rl.question("Senha: ", async (password) => {
    
    try {
      const usersData = await fs.readFile(USERS_PATH, "utf-8");
      const users = JSON.parse(usersData);

      const user = users.find(
        (u) => u.username === username && u.password === password
      );

      if (!user) {
        console.log("\nCredenciais inválidas.");
        rl.close();
        process.exit(1);
      }


      const token = jwt.sign(
        { username: user.username },
        SECRET_KEY,
        { expiresIn: "1h" }
      );

      console.log(`\nLogin bem-sucedido! Bem-vindo, ${user.username}!\n`);
      console.log("Token gerado:", token);
      console.log("\nIniciando o servidor...\n");


      const child = spawn("node", [SERVER_PATH], {
        stdio: "inherit",
        shell: true,
        env: { ...process.env, AUTH_TOKEN: token }
      });

      child.on("close", (code) => {
        console.log(`\nServidor encerrado com código ${code}`);
        process.exit(code);
      });

    } catch (err) {
      console.log("\nErro ao ler arquivo de usuários.");
      console.error(err);
      rl.close();
      process.exit(1);
    }

  });
});
