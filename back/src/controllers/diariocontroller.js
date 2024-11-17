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

const exibirEntradas = async (req, res) => {
    try {
        const usuarioId = req.usuarioId;
        const diarioId = req.body;
        if (!usuarioId) {
            return res.status(400).json({ message: "Usuário não autenticado ou inválido." });
        }

        //Busca o diario que corresponnde ao especificado pelo id no Storage
        const entradas = await Entradas.findAll({ where: { diarioId: diarioId} });

        if (!entradas.length) {
            return res.status(404).json({ message: `Nenhuma entrada encontrada.` });
        }

        res.json(entradas);
    } catch (error) {
        console.error("Erro ao buscar entradas:", error.message);
        res.status(500).json({ message: "Erro interno ao buscar entradas." });
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
        res.status(500).json({ erro: "Erro ao adicionar entrada no diário" });
    }

}


//funcao para adicionar dados linkados ao diario
const adicionarEntradaDiario = async (req, res) => {
    const {diarioId,titulo, conteudo, time, date } = req.body;
    

    try {
        const usuarioId = req.usuarioId;
        // Verifica se o usuário existe
        const usuario = await Usuario.findByPk(usuarioId);
        if (!usuario) {
            return res.status(400).json({ erro: "Usuário não encontrado" });
        }

        // Verifica se o usuário já tem um diário
        let diario = await Diario.findOne({ where: { Id : diarioId} });

        // Se o usuário não tiver um diário, cria um novo diário
        

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

module.exports = { adicionarEntradaDiario, adicionarDiario, exibirDiarios, exibirEntradas };
