const express = require('express')
const consign = require('consign')
//const bodyParser = require('body-parser')

//Invocação do express()
const app = express()

//Maneira 1
//Importando o arquivo de rotas
/*
const usuarioController = require('./controllers/usuarios')
usuarioController(app)
*/

//Faz com que o Express aceite dados em JSON, o que não ocorre por padrão
//app.use(bodyParser.json())

//Atualmente o express já consegue ler o json pelo método json()
app.use(express.json())

//Maneira 2, mas prática, pois não exige que seja referenciada função por função
//A operação é armazenada em uma function customExpress() retornando o app
customExpress = () =>{
    consign()
        .include('controllers')
        .include('model')
        .into(app)
    return app
}

//Exportando a função já instanciada
module.exports = customExpress()