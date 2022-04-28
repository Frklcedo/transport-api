// sequelize
const Sequelize = require('sequelize');

const sequelize = new Sequelize('infotransitodb', 'gsjosias', '!josias1997', {
    host: 'localhost',
    dialect: 'mysql'
})

sequelize.authenticate().then(() => {
    console.log("Conexão estabelecida com sucesso");
}).catch(err => {
    console.log(`Não foi possível se conectar: ${err}`)
})

module.exports = { Sequelize, sequelize};
