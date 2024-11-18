// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const diarioController = require("../controllers/entradacontroller");
const authMiddleware = require("../controllers/authMiddleware");

// Rotas para adicionar entradas, criar diarios e exibir eles
router.post("/createEntrada", authMiddleware, diarioController.adicionarEntradaDiario);
router.post("/exibirEntradas", authMiddleware, diarioController.exibirEntradas);
router.post("/exibirEntrada", authMiddleware, diarioController.exibirEntrada);


module.exports = router;
