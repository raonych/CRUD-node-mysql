const Sequelize = require("sequelize");

const con = new Sequelize("DiarioBordo", "root", "",{
    host: "localhost",
    dialect: "mysql",
});


const Usuario = con.define("usuarios",{
    user_nome:{
        type: Sequelize.STRING,
    },
    user_email:{
        type: Sequelize.STRING,
    },
    user_senha:{
        type: Sequelize.STRING,
    }
})

const Diario = con.define("diarios",{
    diario_nome:{
        type: Sequelize.STRING,
    }
})
const Entradas = con.define("entradas",{
    entr_titulo: {
        type: Sequelize.STRING,
    },
    entr_conteudo: {
        type: Sequelize.STRING,
    },
    entr_time: {
        type: Sequelize.TIME,
    },
    entr_date: {
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

/*Diario.hasMany(Entradas, { foreignKey: 'diarioId' });
Entradas.belongsTo(Diario, { foreignKey: 'diarioId' });
*/
Usuario.sync({ force: true});
Backup.sync({ force: true});
Diario.sync({ force: true});
Lembrete.sync({ force: true});
Entradas.sync({ force: true});


con.authenticate().then(function(){
    console.log("conexão realizada com sucesso");

}).catch(function(err){
    console.log("Erro ao conectar com o banco de dados" + err);
})

module.exports = {
    Usuario,
    Entradas,
    Lembrete,
    Backup,
    Diario
};