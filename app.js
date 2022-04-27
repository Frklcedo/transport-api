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

const dataretrieve = (model, modelargs) => {
    if(modelargs.reference){
        
        const data = model.findAll(model.reference).then(objs => {
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
    else{
        const data = model.findAll().then(objs => {
            const data = [];
            objs.forEach(obj =>{
                let parentValues = obj.dataValues;
                if(modelargs.callbacks){
                    let childrenValues = {};
                    modelargs.callbacks.forEach(callback => {
                        const cbresult = callback.then(cbpromise => {
                            return cbpromise;
                        });
                        console.log('algo', cbresult);
                        childrenValues = {...childrenValues, ...cbresult};
                    });
                    data.push({...parentValues, ...childrenValues});
                }
                else{
                    data.push(parentValues);
                }
                console.log('datainpromise', data);
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
        return data;
    }

}

app.get('/fulldata', (request, response) => {
    // response.status(200).send('aaaaa');
    const res = dataretrieve(Motorista,{
        callbacks: [
            dataretrieve(Veiculo,{
                string: 'veiculosPossuidos',
                reference: {
                    where: {
                        id_motorista: 0
                    }
                }
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
    const res = dataretrieve(Veiculo);
    res.then(data => {
        console.log(data);
        // console.log(JSON.stringify(data));
        response.status(200).send(data);
    })
});

app.listen(PORT, () => console.log(`API read on port ${PORT}`));