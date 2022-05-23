
const db = require('./db');
const Motorista = require('./Motorista');

// Tabela de veiculos
const Veiculo = db.sequelize.define('veiculo', {
    placa: {
        type: db.Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    renavam: {
        type: db.Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    chassi: {
        type: db.Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    fabricante: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    uf: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    cidade: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    ano: {
        type: db.Sequelize.INTEGER,
        allowNull: false
    },
    modelo: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    ano_modelo: {
        type: db.Sequelize.INTEGER,
        allowNull: false
    },
    ano_exercicio: {
        type: db.Sequelize.INTEGER,
        allowNull: false
    },
    cor: {
        type: db.Sequelize.STRING,
    },
    status_ipva: {
        type: db.Sequelize.BOOLEAN,
        allowNull: false
    },
    venda_ativa: {
        type: db.Sequelize.BOOLEAN,
        allowNull: false
    },
    placa_novo_padrao: {
        type: db.Sequelize.BOOLEAN,
        allowNull: false
    },
    id_motorista: {
        type: db.Sequelize.INTEGER,
        references: {
            model: Motorista,
            key: 'id'
        }
    }

},{
    tableName: 'tb_veiculo',
    timestamps: false
});

Veiculo.sync();

module.exports = Veiculo;