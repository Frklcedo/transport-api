const db = require('./db');
const Veiculo = require('./Veiculo');

// Tabela de combustíveis
const Combustivel = db.sequelize.define('combustivel', {
    combustivel: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    id_veiculo: {
        type: db.Sequelize.INTEGER,
        references: {
            model: Veiculo,
            key: 'id'
        }
    }

},{
    tableName: 'tb_combustivel',
    timestamps: false
});

Combustivel.sync();

module.exports = Combustivel;