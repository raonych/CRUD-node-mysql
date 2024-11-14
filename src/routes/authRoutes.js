// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authcontroller");

// Rota para cadastro
router.post("/signup", authController.cadastrarUsuario);

// Rota para login
router.post("/login", authController.loginUsuario);

module.exports = router;
