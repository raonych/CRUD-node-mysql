const { Usuario, Diario, Entradas } = require("../database/db");  // Importando os modelos

// Função para adicionar uma entrada no diário

const exibirDiarios = async (req, res) => {
    try {
        const usuarioId = req.usuarioId;

        if (!usuarioId) {
            return res.status(400).json({ message: "Usuário não autenticado ou inválido." });
        }

        // Busca todos os diários que correspondem ao usuário autenticado
        const diarios = await Diario.findAll({ where: { usuarioId: usuarioId} });

        if (!diarios.length) {
            return res.status(404).json({ message: `Nenhum diário encontrado.${usuarioId}` });
        }

        res.json(diarios);
    } catch (error) {
        console.error("Erro ao buscar diários:", error.message);
        res.status(500).json({ message: "Erro interno ao buscar diários." });
    }
};



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
                entrada: novaEntrada
            });
        }

    catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao adicionar entrada no diário" });
    }

}


const adicionarEntradaDiario = async (req, res) => {
    const {titulo, conteudo, time, date } = req.body;
    

    try {
        const usuarioId = req.usuarioId;
        // Verifica se o usuário existe
        const usuario = await Usuario.findByPk(usuarioId);
        if (!usuario) {
            return res.status(400).json({ erro: "Usuário não encontrado" });
        }

        // Verifica se o usuário já tem um diário
        let diario = await Diario.findOne({ where: { usuarioId: usuarioId} });

        // Se o usuário não tiver um diário, cria um novo diário
        if (!diario) {
            diario = await Diario.create({
                diario_nome: `Diário de ${usuario.nome}`,  // Nome padrão do diário
                usuarioId: usuarioId
            });
        }

        // Cria a entrada no diário
        const novaEntrada = await Entradas.create({
            titulo,
            conteudo,
            time,
            date,
            diarioId: diario.id  // Associa a entrada ao diário
        });

        res.status(201).json({
            mensagem: "Entrada adicionada com sucesso!",
            entrada: novaEntrada
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao adicionar entrada no diário" });
    }
};

module.exports = { adicionarEntradaDiario, adicionarDiario, exibirDiarios };
