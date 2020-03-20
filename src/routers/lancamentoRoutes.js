//Objeto de rotas do Express.js
const router = require('express').Router()

//Obtendo o controller dos lançamentos possuindo seus métodos (regras de negócio)
const lancamentosCtrl = require('../controllers/lancamentos')

//Determinando direcionamento e métodos por tipo de requisição e URI
//Se o método da requisição for GET para a raíz, chama o método listar
router.get('/', lancamentosCtrl.listar)

module.exports = router