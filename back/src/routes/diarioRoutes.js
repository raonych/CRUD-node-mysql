// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const diarioController = require("../controllers/diariocontroller");

// Rota para adicionar uma entrada
router.post("/createEntrada", diarioController.adicionarEntradaDiario );

router.post("/createDiario", diarioController.adicionarDiario );

router.post("/exibirDiarios", diarioController.exibirDiarios );



module.exports = router;
