const express = require("express");
const rotas = express();
const banco = require("./db.js");
const Usuario = banco.Usuario;

const cors = require("cors"); // Importa o CORS
// Habilita o CORS
rotas.use(cors());

rotas.get("/", function(req, res){
    res.send("Rota Principal");
});

rotas.get("/cadastrar/:user_nome/:user_email/:user_senha", async function(req, res){
    try{
    const {user_nome,user_email,user_senha} = req.params; //Guarda os parametros em variaveis

    const novoUsuario = await Usuario.create({user_nome,user_email,user_senha});// insert

    res.json({
        resposta: "Usuário cadastrado com sucesso", 
        usuario: novoUsuario
    })
    }catch(error){
        res.status(500).json({ message: `Erro ao cadastrar usuario: ${error}` });
    }
});
rotas.get("/exibir", async function (req, res) {
    try{
    const usuarios = await Usuario.findAll(); // Busca todos os registros
    res.json(usuarios); // Retorna os registros em formato JSON
    }catch(error){
        res.status(500).json({ message: `Erro ao buscar usuarios: ${error}` });
    }
  });

rotas.get("/editar/:id/:user_nome/:user_email", async function (req, res) {
    try{
    const { id, user_nome, user_email } = req.params;
    const idNumber = parseInt(id, 10); // Converte o ID para número
  
    const [updated] = await Usuario.update(
      { user_nome, user_email },
      {
        where: { id: idNumber }, // Usa o ID numérico
      }
    );
  
    res.json({
      mensagem: "Usuario atualizado com sucesso",
    });
    }catch(error){
        res.status(500).json({ message: `Erro ao buscar usuario: ${error}` });
    }
  });
  
// Deletar usuario via ID
  rotas.get("/deletar/:id", async function (req, res) {
    try{
    const { id } = req.params;
    const idNumber = parseInt(id, 10); // Converte o ID para número
  
    const deleted = await Usuario.destroy({
      where: { id: idNumber },
    }); 
  
    if (deleted) {
      res.json({ mensagem: "Usuario deletado com sucesso" });
    } else {
      res.status(404).json({ mensagem: "Usuario não encontrado" });
    }
    }catch(error){
        res.status(500).json({ message: `Erro ao deletar usuario: ${error}` });
    }
  });

rotas.listen(3001, function () {
    console.log("Server is running on port 3001");
  });