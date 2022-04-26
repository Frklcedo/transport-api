const db = require('./db');

// Tabela de motoristas
const Motorista = db.sequelize.define('motorista', {
    nome: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    rg: {
        type: db.Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    rg_uf: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    rg_org_emissor: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    cnh: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    situacao_carteira: {

        type: db.Sequelize.STRING,
        allowNull: false
    },
    data_nascimento: {
        type: db.Sequelize.DATE,
        allowNull: false
    },
    validade_cnh: {
        type: db.Sequelize.DATE,
        allowNull: false
    },
    primeira_habilitacao: {
        type: db.Sequelize.DATE,
        allowNull: false
    },
    categoria_cnh: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    nome_pai: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    nome_mae: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    num_registro: {
        type: db.Sequelize.STRING,
        allowNull: false
    }
},{
    tableName: 'tb_motorista',
    timestamps: false
});

Motorista.sync();

module.exports = Motorista;