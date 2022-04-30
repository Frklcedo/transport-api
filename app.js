// express 
const express = require('express');
const app = express();
const PORT = 3000

app.use(express.json());

// sequelize
const Motorista = require('./models/Motorista');
const Veiculo = require('./models/Veiculo');
const Combustivel = require('./models/Combustivel')
const Ocorrencia = require('./models/Ocorrencia')
const MultaRENAINF = require('./models/MultaRENAINF')
const RestricaoRENAVAM = require('./models/RestricaoRENAVAM');
const { response } = require('express');

const dataretrieve = function (model, modelargs, ref){
    if(modelargs.reference){
        const data = model.findAll().then(async objs => {
            const data = [];
            objs.forEach(obj =>{
                let parentValues = obj.dataValues;
                if(modelargs.callbacks){
                    let childrenValues = {};
                    modelargs.callbacks.forEach(async callback => {
                       const cbresult = await callback.then(cbresolve => cbresolve);
                       childrenValues = {...childrenValues, ...cbresult};
                    });
                    data.push({...parentValues, ...childrenValues});
                }
                else{
                    data.push(parentValues);
                }
            })
            return data;
        }).catch(err => {
            return "Não foi possível se conectar com o banco de dados: erro " + err;
        });
    }
    else{

    }
    const data = model.findAll().then(objs => {
        const data = [];
        objs.forEach(obj =>{
            let parentValues = obj.dataValues;
            if(modelargs.callbacks){
                let childrenValues = {};
                modelargs.callbacks.forEach(callback => {
                   const cbresult =callback;
                   childrenValues = {...childrenValues, ...cbresult};
                });
                data.push({...parentValues, ...childrenValues});
            }
            else{
                data.push(parentValues);
            }
        })
        return data;
    }).catch(err => {
        return "Não foi possível se conectar com o banco de dados: erro " + err;
    });
    if(modelargs.string){
        dataobj = {};
        dataobj[modelargs.string] = data;
        return dataobj;
    }
    console.log(data);
    return data;

}

app.get('/fulldata', (request, response) => {
    // response.status(200).send('aaaaa');
    const res = dataretrieve(Motorista,{
        callbacks: [
            dataretrieve(Veiculo,{
                string: 'veiculosPossuidos',
                reference: true
            })
        ]
    });
    res.then(data => {
        console.log('data', data);
        // console.log(JSON.stringify(data));
        response.status(200).send(data);
    })
});

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
    const res = dataretrieve(Veiculo,{});
    res.then(data => {
        console.log(data);
        // console.log(JSON.stringify(data));
        response.status(200).send(data);
    })
});

app.listen(PORT, () => console.log(`API read on port ${PORT}`));