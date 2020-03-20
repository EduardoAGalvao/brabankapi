//O Express.js é um framework backend
//que cria abstrações de rotas, middlewares 
//e muitas outras funções para facilitar a criação tanto de API's quanto SPA's.
const express = require('express')
const app = express()

//Define as rotas de acesso público
const auth = require('./routers/authRoutes')

//Define os métodos a serem chamados a partir das requisições em relação às categorias
const categoria = require('./routers/categoriaRoutes')

//Define os métodos a serem chamados a partir das requisições em relação aos usuários
const usuario = require('./routers/usuarioRoutes')

//Define os métodos a serem chamados a partir das requisições em relação aos lançamentos
const lancamento = require('./routers/lancamentoRoutes')

//Obtém a lógica de middleware, que inclui a validação do Token
//O Middleware é uma barreira entre a entrada de dados e o acesso à aplicação
//validando as informações e interceptando requisições
const authMid = require('./middlewares/auth')

//Importando e utilizando biblioteca cors
//ela torna o servidor cross-origin, ampliando seu nível de acesso
const cors = require('cors')
app.use(cors())

//Fazendo o express aceitar JSON
app.use(express.json())

//Incluindo as rotas de auth para o modo público
//No caso, serão as rotas para autenticar e registrar
app.use('/', auth)

//Incluindo middleware no Express
//A partir daqui, tudo que o Express utilizar será primeiramente interceptado pelo Middleware
app.use(authMid)

//Incluindo a rota de categorias para acesso às suas rotas
//por vir após o Middleware, será interceptada cada vez que houver o acesso
app.use('/categorias', categoria)

//Incluindo a rota de usuarios para acesso às suas rotas
app.use('/usuarios', usuario)

//Incluindo a rota de lançamentos para acesso às suas rotas
app.use('/lancamentos', lancamento)

//Exportando objeto express com todos os dados representados
module.exports = app