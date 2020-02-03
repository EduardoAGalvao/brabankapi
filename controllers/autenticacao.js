const {validationResult} = require('express-validator')
const ValidacoesUsuarios = require('../validators/ValidacoesUsuarios')

const autenticacao = (app) => {

    app.post('/registrar', ValidacoesUsuarios.validacoes(), (req,res) => {
        let usuario = req.body;
        //Aplica validações descritas
        const erros = validationResult(req)

        if(!erros.isEmpty()){
            res.status(400).send(erros)
            return
        }

        const usuarioDao = app.model.Usuarios
      
        usuarioDao.inserir(usuario)
        .then((retorno) => {
            usuario.id = retorno.insertId
            res.status(201).send(usuario)
        })
        .catch((erro) =>{
            res.status(500).send(erro)
            console.log(erro)
        })
    })

    app.post('/autenticar', (req, res) => {
        
    })
}

module.exports = autenticacao