//Objeto de rotas do Express.js
const router = require('express').Router()

//Obtendo o controller dos usuários possuindo seus métodos (regras de negócio)
const usuariosCtrl = require('../controllers/usuarios')

//Determinando direcionamento e métodos por tipo de requisição e URI
//Se o método da requisição for GET para a raíz, chama o método listar
router.get('/', usuariosCtrl.listar)

module.exports = router