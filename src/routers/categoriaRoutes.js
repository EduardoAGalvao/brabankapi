//Objeto de rotas do Express.js
const router = require('express').Router()

//Obtendo o controller das categorias possuindo seus métodos (regras de negócio)
const categoriasCtrl = require('../controllers/categorias')

//Determinando direcionamento e métodos por tipo de requisição e URI
//Se o método da requisição for GET para a raíz, chama o método listar
//Se o método da requisição for POST para a raíz, chama o método inserir
router.get('/', categoriasCtrl.listar)
router.post('/', categoriasCtrl.inserir)

module.exports = router