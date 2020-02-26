//Utilizando o Router() do Express.js
const router = require('express').Router()

//Obtendo métodos de autenticação ou registro para montar as rotas
const authCtrl = require('../controllers/public/autenticacao')

//Classe que possui validações customizadas criadas por nós
const usuarioValidator = require('../validators/ValidacoesUsuarios')

//Determinando direcionamento e métodos por tipo de requisição e URI utilizando os path de rotas
router.post('/registrar', usuarioValidator.validacoes(), authCtrl.registrar)
router.post('/autenticar', authCtrl.autenticar)

module.exports = router