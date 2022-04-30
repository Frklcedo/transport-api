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

const dataretrieve = (model, parent, modelstring) => {
    if(parent){
        
        parent.data.map(parentobj => {
            if (parent.model == Motorista){
                let reference = {
                    where: {
                        id_motorista: parentobj.id
                    }
                }
            }
            else {
                let reference = {
                    where: {
                        id_veiculo: parentobj.id
                    }
               }
            }
            parentobj = model.findAll(reference).then(objs => {
                const childdata = [];
                objs.forEach(obj => {
                    childdata.push(obj.dataValues);
                });
                parentobj[modelstring] = childdata;
                return parentobj;
            });

            return parentobj;

        });

        return parent.data;

    }
    else{
        
        const data = model.findAll().then(objs => {
            const data = [];
            objs.forEach(obj =>{
                let parentValues = obj.dataValues;
                data.push(parentValues);
                console.log('datainpromise', data);
            })
            return data;
        }).catch(err => {
            return "Não foi possível se conectar com o banco de dados: erro " + err;
        });
        
        return data;
    }

}

app.get('/', (request, response) => {
    // response.status(200).send('aaaaa');
    const res = dataretrieve(Motorista);
    res.then(data => {
        console.log(data);
        const resmotorista = dataretrieve(Motorista, {
            model: Motorista,
            data 
        });
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

app.get('/combustivel', (request, response) => {
    // response.status(200).send('aaaaa');
    const res = dataretrieve(Combustivel);
    res.then(data => {
        console.log(data);
        // console.log(JSON.stringify(data));
        response.status(200).send(data);
    })
});

app.get('/ocorrencia', (request, response) => {
    // response.status(200).send('aaaaa');
    const res = dataretrieve(Ocorrencia);
    res.then(data => {
        console.log(data);
        // console.log(JSON.stringify(data));
        response.status(200).send(data);
    })
});

app.get('/multarenainf', (request, response) => {
    // response.status(200).send('aaaaa');
    const res = dataretrieve(MultaRENAINF);
    res.then(data => {
        console.log(data);
        // console.log(JSON.stringify(data));
        response.status(200).send(data);
    })
});

app.get('/restricaorenavam', (request, response) => {
    // response.status(200).send('aaaaa');
    const res = dataretrieve(RestricaoRENAVAM);
    res.then(data => {
        console.log(data);
        // console.log(JSON.stringify(data));
        response.status(200).send(data);
    })
});


app.listen(PORT, () => console.log(`API read on port ${PORT}`));