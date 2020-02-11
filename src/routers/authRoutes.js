const router = require('express').Router()
const authCtrl = require('../controllers/public/autenticacao')
const usuarioValidator = require('../validators/ValidacoesUsuarios')

//Determinando direcionamento e métodos por tipo de requisição e URI
router.post('/registrar', usuarioValidator.validacoes(), authCtrl.registrar)
router.post('/autenticar', authCtrl.autenticar)

module.exports = router