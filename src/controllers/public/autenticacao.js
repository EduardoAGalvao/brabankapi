//Arquivos para validação e tratamento de erros
const {validationResult} = require('express-validator')
const ValidacoesUsuarios = require('../../validators/ValidacoesUsuarios')

//Obtendo biblioteca para criptografar a senha
const bcrypt = require('bcryptjs')

//Obtendo o JWT para geração do token
const jwt = require('jsonwebtoken')

//Obtendo a secret necessária
//Essa palavra chave foi desenvolvida no site https://www.md5hashgenerator.com
//utilizando uma palavra-chave escolhida pela turma
const auth = require('../../config/auth')

//Obtendo os métodos em relação ao Usuario
const usuarioDao = new (require('../../model/Usuarios'))()

//Criação de função genérica para gerar token
//A função sign( ) utilizará os parâmetros desejáveis, a secret e o tempo de duração do token
const gerarToken = (params) => jwt.sign(params, auth.secret, {expiresIn: 60})

module.exports = {
    //Método para registrar um usuário, já dando um token em caso de sucesso
    async registrar(req,res){
        const erros = validationResult(req)

        if(!erros.isEmpty()){
            return res.status(400).send(erros)
        }

        let usuario = req.body

        try{
            //Criptografando senha e tornando ela a senha do usuário enviado
            const hash = await bcrypt.hash(usuario.senha, 10)
            usuario.senha = hash

            //Inserindo o usuário e passando o ID do novo objeto ao usuário
            const resultado = await usuarioDao.inserir(usuario)
            usuario = {id: resultado.insertId, ...usuario}

            //Retorna o usuário completo inserido + o token criado a partir de seu id
            res.status(201).send({
                usuario,
                token: gerarToken({id: usuario.id})
            })

        }catch(erro){
            console.log(erro)
            res.status(500).send(erro)
        }

    },

    //Método para autenticação do usuário
    async autenticar(req,res){

        //Obtendo email e senha enviados pela requisição
        const {email, senha} = req.body

        try{
            //Fazendo busca por um usuário que possua esse email
            let usuario = await usuarioDao.buscarPorEmail(email)

            //Recebendo o usuário encontrado (ou não)
            usuario = usuario[0]

            //Se não for encontrado nenhum usuário, retorna mensagem de erro
            if(!usuario){
                return res.status(401).send({erro: 'Usuário e/ou senha inválidos'})
            }

            //O método compare() verifica se a senha enviada é igual a senha armazenada
            if(! await  bcrypt.compare(senha, usuario.senha)){
                return res.status(401).send({erro: 'Usuário e/ou senha inválidos'})
            }

            //Retira o atributo senha do objeto que será retornado
            //mas só retira da visualização, não do banco
            delete usuario.senha

            //Retorna o usuário completo (sem senha) + um token para acesso aos recursos
            res.send(
                {
                    usuario, 
                    token: gerarToken({id: usuario.id})
                }
            )
        }catch(erro){
            console.log(erro)
            res.status(500).send({erro: "Erro ao autenticar"})
        }
        
    }
}

//Refatorado em 11/02, função não mais utilizada
const autenticacao = (app) => {

    //Modo antigo
    //Refatorado em 11/02
    /*
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

    })*/

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
    //Refatorado em 11/02
    /*
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
    })*/


}

//Refatorado em 11/02
//module.exports = autenticacao