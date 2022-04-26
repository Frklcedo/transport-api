// express 
const express = require('express');
const app = express();
const PORT = 5001

app.use(express.json());

// sequelize
const Motorista = require('./models/Motorista');
const Veiculo = require('./models/Veiculo');

const dataretrieve = (callback) => {

    const data = Motorista.findAll().then(motoristas => {
        const data = [];
        motoristas.forEach(motorista =>{
            data.push(motorista.dataValues);
        })
        return data;
    }).catch(err => {
        return "Não foi possível se conectar com o banco de dados: erro " + err;
    });

    return data;
}

app.get('/motoristas', (request, response) => {
    const res = dataretrieve();
    // response.status(200).send('aaaaa');
    res.then(data => {
        console.log(data);
        // console.log(JSON.stringify(data));
        response.status(200).send(data);
    })
});

app.listen(PORT, () => console.log(`API read on port ${PORT}`));