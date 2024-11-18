const { Usuario, Diario, Entradas } = require("../database/db");  // Importando os modelos

// Função para listar diarios do usuario 
const exibirDiarios = async (req, res) => {
    try {
        const usuarioId = req.usuarioId;

        if (!usuarioId) {
            return res.status(400).json({ message: "Usuário não autenticado ou inválido." });
        }

        // Busca todos os diários que correspondem ao usuário autenticado
        const diarios = await Diario.findAll({ where: { usuarioId: usuarioId} });

        if (!diarios.length) {
            return res.status(404).json({ message: `Nenhum diário encontrado.` });
        }

        res.json(diarios);
    } catch (error) {
        console.error("Erro ao buscar diários:", error.message);
        res.status(500).json({ message: "Erro interno ao buscar diários." });
    }
};

//funcao para adicionar novo diario ao usuario logado
const adicionarDiario = async (req,res) => {
    const {nome, resumo, date } = req.body;
    try {
         const usuarioId = req.usuarioId;
        // Verifica se o usuário existe
        const usuario = await Usuario.findByPk(usuarioId);
        if (!usuario) {
            return res.status(400).json({ erro: "Usuário não encontrado" });
        }

            let diario = await Diario.create({
                nome: nome,
                resumo: resumo,
                data: date,  
                usuarioId: usuarioId
            });

            res.status(201).json({
                mensagem: "Entrada adicionada com sucesso!",
                diario: diario
            });
        }

    catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao adicionar diário" });
    }

}


module.exports = { adicionarDiario, exibirDiarios};
