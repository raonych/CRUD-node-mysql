// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const diarioController = require("../controllers/diariocontroller");

// Rota para adicionar uma entrada
router.post("/create", diarioController.adicionarEntradaDiario );



module.exports = router;
