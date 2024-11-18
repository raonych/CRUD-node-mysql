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

const editarDiario = async (req,res) =>{
    const {diarioId, nome, resumo, date} = req.body;
    try {
        const usuarioId = req.usuarioId;
        if (!usuarioId){
            return res.status(400).json({message: "Usuário não autenticado"})
        }
        const diario = await Diario.findOne({where: {id: diarioId}});
        if (!diario) {
            return res.status(400).json({message:"diario não encontrado"});
        }
        const newDiario = await Diario.update(
            {
            nome: nome,
            resumo: resumo,
            date: date

        },{
            where: {id: diarioId}
        });

        res.json({ message: "Diário atualizado com sucesso"});
    }
    catch (error) {
        console.error("Erro ao atualizar diario:", error.message);
        res.status(500).json({ message: "Erro interno ao atualizar diario." });
    }
}

const deleteDiario = async (req,res) =>{
    const {diarioId} = req.body;
    try {
        const usuarioId = req.usuarioId;
        if (!usuarioId){
            return res.status(400).json({message: "Usuário não autenticado"})
        }

        const deleted = await Diario.destroy({where: {id: diarioId}});

        if(deleted){
            res.json({message: "Diario deletada com sucesso!"});
        }    
        else{
            res.status(404).json({message:"Diario não encontrado"})
        }
    }
    catch (error) {
        console.error("Erro ao deletar diario:", error.message);
        res.status(500).json({ message: "Erro interno ao deletar diario." });
    }
}

module.exports = { adicionarDiario, exibirDiarios, editarDiario, deleteDiario};
