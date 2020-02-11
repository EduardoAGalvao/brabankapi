const router = require('express').Router()
const categoriasCtrl = require('../controllers/categorias')

//Determinando direcionamento e métodos por tipo de requisição e URI
router.get('/', categoriasCtrl.listar)
router.post('/', categoriasCtrl.inserir)

module.exports = router