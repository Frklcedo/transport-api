const db = require('./db');
const Motorista = require('./Motorista');
const Veiculo = require('./Veiculo');

// Tabela de multas RENAINF
const MultaRENAINF = db.sequelize.define('multaRENAINF', {
    titulo_multa: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    data_expedida: {
        type: db.Sequelize.DATE,
        allowNull: false
    },
    data_vencimento: {
        type: db.Sequelize.DATE,
        allowNull: false
    },
    valor_multa: {
        type: db.Sequelize.FLOAT,
        allowNull: false
    },
    id_motorista: {
        type: db.Sequelize.INTEGER,
        references: {
            model: Motorista,
            key: 'id'
        }
    },
    id_veiculo: {
        type: db.Sequelize.INTEGER,
        references: {
            model: Veiculo,
            key: 'id'
        }
    }

},{
    tableName: 'tb_multas_renainf',
    timestamps: false
});

MultaRENAINF.sync();

module.exports = MultaRENAINF;