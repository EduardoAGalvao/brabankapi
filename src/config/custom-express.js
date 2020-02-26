//Obtendo a biblioteca express
const express = require('express')

//O consign é uma biblioteca que gerencia as rotas
const consign = require('consign')

//Agora não mais utilizado, o bodyParser fazia o express conseguir ler o JSON
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

    //A ordem de inserção no consign() importa, pois primeiramente são inclusos os públicos
    //depois a regra de middleware é aplicada
    //e todos os diretórios a partir dele devem seguir essa regra na autenticação
    consign()
        .include('controllers/public')
        .then('middlewares')
        .then('controllers')
        .then('models')
        .into(app)

    return app
}

//Exportando a função já instanciada
module.exports = customExpress()