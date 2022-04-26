const db = require('./db');

// Tabela de restrições RENAVAM
const RestricaoRENAVAM = db.sequelize.define('restricaoRENAVAM', {
    tipo_restricao: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    status_restricao: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    data_efetuacao: {
        type: db.Sequelize.DATE,
    },
    is_renajud: {
        type: db.Sequelize.STRING,
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
    tableName: 'tb_restricoes_renavam',
    timestamps: false
});

RestricaoRENAVAM.sync();

module.exports = RestricaoRENAVAM;