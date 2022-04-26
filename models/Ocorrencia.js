const db = require('./db');

// Tabela de ocorrências criminais
const Ocorrencia = db.sequelize.define('ocorrencia', {
    titulo_ocorrencia: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    data_ocorrencia: {
        type: db.Sequelize.DATE,
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
    tableName: 'tb_ocorrencias',
    timestamps: false
});

Ocorrencia.sync();

module.exports = Ocorrencia;
