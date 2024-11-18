// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const entradaController = require("../controllers/entradacontroller");
const authMiddleware = require("../controllers/authMiddleware");

// Rotas para adicionar entradas, criar diarios e exibir eles
router.post("/createEntrada", authMiddleware, entradaController.adicionarEntradaDiario);
router.post("/exibirEntradas", authMiddleware, entradaController.exibirEntradas);
router.post("/exibirEntrada", authMiddleware, entradaController.exibirEntrada);
router.post("/editarEntrada", authMiddleware, entradaController.editarEntrada);
router.post("/deleteEntrada", authMiddleware, entradaController.deleteEntrada)

module.exports = router;
