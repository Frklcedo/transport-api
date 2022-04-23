// express 
const express = require('express');
const app = express();
const PORT = 5000

app.use(express.json());

// sequelize
const Motorista = require('./models/Motorista');
const Veiculo = require('./models/Veiculo');

// Motorista.findAll().then(motoristas => {
//     console.log(motoristas)
// })

app.get('/', (request, response) => {
    response.status(200).send({

    })
});

app.listen(PORT, () => console.log(`API read on port ${PORT}`));