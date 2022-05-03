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
const req = require('express/lib/request');

const dataretrieve = (model, parent) => {
    if(typeof parent !== 'undefined'){
        if (parent.ordem){
            const data = model.findAll().then(objs => {
                const data = [];
                objs.forEach(obj =>{
                    let parentValues = obj.dataValues;
                    const children = [];
                    parent.data.forEach(child => {
                        if(parent.model == Motorista){
                            if(child.id_motorista == parentValues.id){
                                children.push(child);
                            }
                        }
                        else{
                            if(child.id_veiculo == parentValues.id){
                                children.push(child);
                            }
                        }
                    });
                    parentValues[parent.str] = children;
                    data.push(parentValues);
                    console.log('datainpromise', data);
                })

                return data;
            }).catch(err => {
                return "Não foi possível se conectar com o banco de dados: erro " + err;
            });
            
            return data;

        }
        else{
            let reference = {
                order: ['id_veiculo']
            }
            if(parent.model == Motorista){
                reference.order[0] = 'id_motorista'
            }
            const data = model.findAll(reference).then(childobj => {
    
                parent.data.forEach(parentobj => {
    
                    const children = [];
                    childobj.forEach(childdata => {
    
                        const childDataValue = childdata.dataValues;
                        if(childDataValue[reference.order] == parentobj.id){
                            children.push(childDataValue);
                        }
                        
                    });             
                    
                    parentobj[parent.str] = children;
                });
                
                console.log(parent.data)
                return parent.data;
    
            }).catch(err => console.log(err));
            return data;
        }
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
    dataretrieve(Veiculo).then(data => {
        console.log(data);
        return data;
    }).then(data => {
        return dataretrieve(Combustivel,{ model: Veiculo, data: data, str: "combustivel"});
    }).then(data => {
        return dataretrieve(Ocorrencia,{ model: Veiculo, data: data, str: "ocorrencias"});
    }).then(data => {
        return dataretrieve(MultaRENAINF,{ model: Veiculo, data: data, str: "multasRENAINF"});
    }).then(data => {
        return dataretrieve(RestricaoRENAVAM,{ model: Veiculo, data: data, str: "restricaoRENAVAM"});
    }).then(data => {
        return dataretrieve(Motorista, {model: Motorista,data: data, str: "veiculosPossuidos", ordem: 'desc'});
    }).then(data => {
        response.status(200).send(data);
    });
    // console.log(JSON.stringify(data));
});


// const Combustivel = require('./models/Combustivel')
// const Ocorrencia = require('./models/Ocorrencia')
// const MultaRENAINF = require('./models/MultaRENAINF')
// const RestricaoRENAVAM = require('./models/RestricaoRENAVAM');

app.get('/motorista', (request, response) => {
    // response.status(200).send('aaaaa');
    const res = dataretrieve(Motorista);
    res.then(data => {
        console.log(data);
        // console.log(JSON.stringify(data));
        response.status(200).send(data);
    })
});

app.get('/motorista/:id', (request, response) => {
    Veiculo.findAll({
        where: {
            id_motorista: request.params.id
        }
    }).then(data => {
        const arr = [];
        data.forEach(carro => {
            arr.push(carro.dataValues);
        })
        return arr;
    }).then(data => {
        return dataretrieve(Combustivel,{ model: Veiculo, data: data, str: "combustivel"});
    }).then(data => {
        return dataretrieve(Ocorrencia,{ model: Veiculo, data: data, str: "ocorrencias"});
    }).then(data => {
        return dataretrieve(MultaRENAINF,{ model: Veiculo, data: data, str: "multasRENAINF"});
    }).then(data => {
        return dataretrieve(RestricaoRENAVAM,{ model: Veiculo, data: data, str: "restricaoRENAVAM"});
    }).then(data => {
        Motorista.findByPk(request.params.id).then(motorista => {
            const motoristadono = [
                {
                    ...motorista.dataValues,
                    veiculosPossuidos: data
                }
            ]
            return motoristadono;
        }).then(data => {
            response.status(200).send(data);
        });
    })
});

app.get('/veiculo', (request, response) => {
    // response.status(200).send('aaaaa');
    dataretrieve(Veiculo).then(data => {
        console.log(data);
        return data;
    }).then(data => {
        return dataretrieve(Combustivel,{ model: Veiculo, data: data, str: "combustivel"});
    }).then(data => {
        return dataretrieve(Ocorrencia,{ model: Veiculo, data: data, str: "ocorrencias"});
    }).then(data => {
        return dataretrieve(MultaRENAINF,{ model: Veiculo, data: data, str: "multasRENAINF"});
    }).then(data => {
        return dataretrieve(RestricaoRENAVAM,{ model: Veiculo, data: data, str: "restricaoRENAVAM"});
    }).then(data => {
        response.status(200).send(data);
    });
    // console.log(JSON.stringify(data));
});

app.get('/veiculo/:placa', (request, response) => {
    const placa = request.params.placa;
    Veiculo.findAll({
        where: {
            placa
        }
    }).then(data => {
        const arr = []
        data.forEach(dataValues => {
            arr.push(dataValues.dataValues);
        });
        return arr;
    }).then(data => {
        return dataretrieve(Combustivel,{ model: Veiculo, data: data, str: "combustivel"});
    }).then(data => {
        return dataretrieve(Ocorrencia,{ model: Veiculo, data: data, str: "ocorrencias"});
    }).then(data => {
        return dataretrieve(MultaRENAINF,{ model: Veiculo, data: data, str: "multasRENAINF"});
    }).then(data => {
        return dataretrieve(RestricaoRENAVAM,{ model: Veiculo, data: data, str: "restricaoRENAVAM"});
    }).then(data => {
        console.log(data) ;
        return Motorista.findByPk(data[0].id_motorista).then(motorista => {
            data[0].motorista = motorista;
            return data;
        })

    }).then(data => {
        response.status(200).send(data);
    });
});

app.get('/veiculo-uni', (request, response) => {
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