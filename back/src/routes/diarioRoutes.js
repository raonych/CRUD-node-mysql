// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const diarioController = require("../controllers/diariocontroller");
const authMiddleware = require("../controllers/authMiddleware");

// Rotas para adicionar entradas, criar diarios e exibir eles
router.post("/createDiario", authMiddleware, diarioController.adicionarDiario);
router.post("/exibirDiarios", authMiddleware, diarioController.exibirDiarios);
router.post("/createEntrada", authMiddleware, diarioController.adicionarEntradaDiario);
router.post("/exibirEntradas", authMiddleware, diarioController.exibirEntradas);



module.exports = router;
