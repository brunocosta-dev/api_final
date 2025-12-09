import readline from "readline";
import { spawn } from "child_process";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs/promises";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const SERVER_PATH = join(__dirname, "src/server.js");
const USERS_PATH = join(__dirname, "users.json");

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

      if (user) {
        console.log(`\nLogin bem-sucedido! Bem-vindo, ${user.username}!\n`);
        console.log("Iniciando o servidor principal...\n");

        const child = spawn("node", [SERVER_PATH], {
          stdio: "inherit",
          shell: true
        });

        child.on("close", (code) => {
          console.log(`\nServidor encerrado com código ${code}`);
          process.exit(code);
        });

      } else {
        console.log("\nFalha na autenticação: Credenciais inválidas");
        console.log("Servidor NÃO será iniciado.\n");
        rl.close();
        process.exit(1);
      }

    } catch (err) {
      console.log("\nErro ao ler arquivo de usuários.");
      console.error(err);
      rl.close();
      process.exit(1);
    }
  });
});