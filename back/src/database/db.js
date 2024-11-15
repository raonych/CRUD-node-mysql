const Sequelize = require("sequelize");

const con = new Sequelize("DiarioBordo", "root", "",{
    host: "localhost",
    dialect: "mysql",
    logging: false, // Desabilita logs do SQL no console
});


const Usuario = con.define("usuarios",{
    nome:{
        type: Sequelize.STRING,
    },
    email:{
        type: Sequelize.STRING,
        unique: true,  // Garantir que o e-mail seja único
    },
    senha:{
        type: Sequelize.STRING,
    }
})

const Entradas = con.define("entradas",{
    titulo: {
        type: Sequelize.STRING,
    },
    conteudo: {
        type: Sequelize.STRING,
    },
    time: {
        type: Sequelize.TIME,
    },
    date: {
        type: Sequelize.DATE
    }
})
const Lembrete = con.define("Lembretes",{
    lembrete_titulo: {
        type: Sequelize.STRING,
    },
    lembrete_msg:{
        type: Sequelize.STRING,
    },
    lembrete_time: {
        type: Sequelize.TIME,
    },
    lembrete_date: {
        type: Sequelize.DATE
    }
})
const Backup = con.define("backup",{
    hora: {
        type: Sequelize.TIME,
    },
    data:{
        type: Sequelize.DATE
    },
})

const Diario = con.define("diarios", {
    nome: {
        type: Sequelize.STRING,
    },
    resumo: {
        type: Sequelize.STRING
    },
    data: {
        type: Sequelize.STRING
    },
    usuarioId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'usuarios', 
            key: 'id',
        },
    },
});

// Relacionamento entre Diario e Usuario 
Diario.belongsTo(Usuario, { foreignKey: 'usuarioId' });
Usuario.hasMany(Diario, { foreignKey: 'usuarioId' });

// Relacionamento entre Diario e Entradas 
Diario.hasMany(Entradas, { foreignKey: 'diarioId' });
Entradas.belongsTo(Diario, { foreignKey: 'diarioId' });



const syncDatabase = async () => {
    try {
        await  Usuario.sync({ alter: true});
        await Backup.sync({ alter: true});
        await  Diario.sync({ alter: true});
        await Lembrete.sync({ alter: true});
        await Entradas.sync({ alter: true});
        console.log("Tabelas sincronizadas com sucesso");
    } catch (err) {
        console.error("Erro ao sincronizar as tabelas:", err);
    }
};

syncDatabase();

module.exports = {
    Usuario,
    Entradas,
    Lembrete,
    Backup,
    Diario
};