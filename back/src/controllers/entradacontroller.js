const {Diario, Entradas } = require("../database/db");  // Importando os modelos

//funcao para listar entradas do diario
const exibirEntradas = async (req, res) => {
    const {diarioId} = req.body;  
    try {
        const usuarioId = req.usuarioId;
        if (!usuarioId) {
            return res.status(400).json({ message: "Usuário não autenticado ou inválido." });
        }

        //Busca o diario que corresponnde ao especificado pelo id no Storage
        const entradas = await Entradas.findAll({ where: { diarioId: diarioId} });
        const diario = await Diario.findOne({where: {id: diarioId}});
        if (!diario) {
            return res.status(404).json({ message: `Nenhuma diário encontrada.` });
        }

        res.json({entradas, diario});
    } catch (error) {
        console.error("Erro ao buscar entradas:", error.message);
        res.status(500).json({ message: "Erro interno ao buscar entradas." });
    }
};

//função para retornar conteudo de uma entrada para o usuario editar
const exibirEntrada = async (req, res) => {
    const {entradaId} = req.body;
    try {
        const usuarioId = req.usuarioId;
        if (!usuarioId){
            return res.status(400).json({message: "Usuário não autenticado ou inválido"})
        }
        const entrada = await Entradas.findOne({where: {id: entradaId}});
        if (!entrada) {
            return res.status(400).json({message:"entrada não encontrada"});
        }

        res.json({entrada});
    }
    catch (error) {
        console.error("Erro ao buscar entrada:", error.message);
        res.status(500).json({ message: "Erro interno ao buscar entrada." });
    }
};

//funcao para adicionar entradas linkados ao diario
const adicionarEntradaDiario = async (req, res) => {
    const {diarioId,titulo, conteudo, time, date } = req.body;
    

    try {

        // seleciona o diario do id especificado 
        let diario = await Diario.findOne({ where: { Id : diarioId} });

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

const editarEntrada = async (req,res) =>{
    const {entradaId, titulo, conteudo, time, date} = req.body;
    try {
        const usuarioId = req.usuarioId;
        if (!usuarioId){
            return res.status(400).json({message: "Usuário não autenticado"})
        }
        const entrada = await Entradas.findOne({where: {id: entradaId}});
        if (!entrada) {
            return res.status(400).json({message:"entrada não encontrada"});
        }
        const newEntrada = await Entradas.update(
            {
            titulo: titulo,
            conteudo: conteudo,
            time: time,
            date: date   
        },{
            where: {id: entradaId}
        });

        res.json({newEntrada});
    }
    catch (error) {
        console.error("Erro ao atualizar entrada:", error.message);
        res.status(500).json({ message: "Erro interno ao atualizar entrada." });
    }
}

const deleteEntrada = async (req,res) =>{
    const {entradaId} = req.body;
    try {
        const usuarioId = req.usuarioId;
        if (!usuarioId){
            return res.status(400).json({message: "Usuário não autenticado"})
        }

        const deleted = await Entradas.destroy({where: {id: entradaId}});

        if(deleted){
            res.json({message: "Entrada deletada com sucesso!"});
        }    
        else{
            res.status(404).json({message:"Entrada não encontrada"})
        }
    }
    catch (error) {
        console.error("Erro ao atualizar entrada:", error.message);
        res.status(500).json({ message: "Erro interno ao atualizar entrada." });
    }
}

module.exports = { adicionarEntradaDiario, exibirEntradas, exibirEntrada, editarEntrada, deleteEntrada };
