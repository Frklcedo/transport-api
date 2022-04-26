// express 
const express = require('express');
const app = express();
const PORT = 3000

app.use(express.json());

// sequelize
const Motorista = require('./models/Motorista');
const Veiculo = require('./models/Veiculo');

const dataretrieve = (model, ...callback) => {

    const data = model.findAll().then(objs => {
        const data = [];
        objs.forEach(obj =>{
            data.push(obj.dataValues);
        })
        return data;
    }).catch(err => {
        return "Não foi possível se conectar com o banco de dados: erro " + err;
    });

    return data;
}

app.get('/motorista', (request, response) => {
    // response.status(200).send('aaaaa');
    const res = dataretrieve(Motorista);
    res.then(data => {
        console.log(data);
        // console.log(JSON.stringify(data));
        response.status(200).send(data);
    })
});

app.get('/veiculo', (request, response) => {
    // response.status(200).send('aaaaa');
    const res = dataretrieve(Veiculo);
    res.then(data => {
        console.log(data);
        // console.log(JSON.stringify(data));
        response.status(200).send(data);
    })
});

app.listen(PORT, () => console.log(`API read on port ${PORT}`));