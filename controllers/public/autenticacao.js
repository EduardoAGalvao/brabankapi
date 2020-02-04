const {validationResult} = require('express-validator')
const ValidacoesUsuarios = require('../../validators/ValidacoesUsuarios')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require('../../config/auth')

//Criação de função genérica para gerar token
const gerarToken = (params) => jwt.sign(params, auth.secret, {expiresIn: 60})

const autenticacao = (app) => {

    app.post('/registrar', ValidacoesUsuarios.validacoes(), (req,res) => {
        let usuario = req.body;
        //Aplica validações descritas
        const erros = validationResult(req)

        if(!erros.isEmpty()){
            res.status(400).send(erros)
            return
        }

        //bcrypt serve para criptografar a senha do usuário
        //O código ocorre de maneira assíncrona, então todos os comandos devem estar dentro dessa função
        bcrypt.hash(usuario.senha, 10, (erro, hash) => {
            usuario.senha = hash

            const usuarioDao = app.model.Usuarios
      
            usuarioDao.inserir(usuario)
            .then((retorno) => {
                //Apagando atributo senha do JSON de retorno, para que não apareça
                delete usuario.senha
                console.log(retorno)

                usuario.id = retorno.insertId
                res.status(201).send(
                    {
                        usuario, 
                        token: gerarToken({id: usuario.id})
                    })
            })
            .catch((erro) =>{
                res.status(500).send(erro)
                console.log(erro)
            })
        })

    })

    //********PRIMEIRA MANEIRA - SEM MÉTODOS ASSÍNCRONOS, UTILIZANDO .then()
    // app.post('/autenticar', (req, res) => {
    //     const {email, senha} = req.body
    //     usuarioDao = app.model.Usuarios
    //     usuarioDao.buscarPorEmail(email)
    //             .then((usuario) => {
    //                 if(!usuario){
    //                     return res.status(401).send({erro: 'Usuário e/ou senha inválidos'})
    //                 }

    //                 bcrypt.compare(senha, usuario.senha, (erro, resultado) => {
    //                     if(!resultado){
    //                         return res.status(401).send({erro: 'Usuário e/ou senha inválidos'})
    //                     }
                        
    //                     //Parâmetros do sign:
    //                     //Payload -> identificação
    //                     //auth.secret -> chave própria, criada por meio de chave criptografada
    //                     //options -> objeto com opções, como o tempo para o token expirar
    //                     const token = jwt.sign({id: usuario.id}, auth.secret, {expiresIn: 60})

    //                     delete usuario.senha

    //                     res.send({usuario, token})
    //                 })
    //             })
    // })

    //********SEGUNDA MANEIRA - UTILIZANDO ASYNC/AWAIT
    app.post('/autenticar', async (req, res) => {
        const {email, senha} = req.body
        usuarioDao = app.model.Usuarios
        const usuario = await usuarioDao.buscarPorEmail(email)

        if(!usuario){
            return res.status(401).send({erro: 'Usuário e/ou senha inválidos'})
        }

        if(! await  bcrypt.compare(senha, usuario.senha)){
            return res.status(401).send({erro: 'Usuário e/ou senha inválidos'})
        }

        delete usuario.senha

        res.send(
            {
                usuario, 
                token: gerarToken({id: usuario.id})
            }
        )
    })


}

module.exports = autenticacao