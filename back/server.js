// index.js
const express = require("express");
const cors = require("cors");
const rotas = express();
const { Usuario, Entradas } = require("./src/database/db")
// Importar as rotas
const authRoutes = require("./src/routes/authRoutes");
const diarioRoutes = require("./src/routes/diarioRoutes");

rotas.use(cors());
rotas.use(express.json()); // Para parsear JSON

// Definindo a rota principal
rotas.get("/", (req, res) => {
    res.send("API de Planejamento de Estudo");
});

// Usando as rotas
rotas.use("/api/auth", authRoutes);
rotas.use("/api/entradas", diarioRoutes);

rotas.get("/exibir", async function (req, res) {
    try{
    const usuarios = await Usuario.findAll(); // Busca todos os registros
    res.json(usuarios); // Retorna os registros em formato JSON
    }catch(error){
        res.status(500).json({ message: `Erro ao buscar usuarios: ${error}` });
    }
  });

rotas.get("/exibirEntrada", async function (req, res) {
    try{
    const entradas = await Entradas.findAll(); // Busca todos os registros
    res.json(entradas); // Retorna os registros em formato JSON
    }catch(error){
        res.status(500).json({ message: `Erro ao buscar usuarios: ${error}` });
    }
  });

// Iniciando o servidor
rotas.listen(3001, () => {
    console.log("Server is running on port 3001");
});
