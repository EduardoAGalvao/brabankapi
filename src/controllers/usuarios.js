const {validationResult} = require('express-validator')
const ValidacoesUsuarios = require('../validators/ValidacoesUsuarios')
//Abaixo está sendo importada a classe Usuario e já instanciando
const usuarioDao = new (require('../model/Usuarios'))()

//Exportando JSON com métodos
module.exports = {
    //Método para listar os usuários
    //ele tentará pelo try, se estiver vazio retornará o erro Lista vazia
    //senão retorna todos os usuários
    async listar(req,res){
        try{
            const usuarios = await usuarioDao.listar()
            if(!usuarios)
            return res.status(404).send({erro: 'Lista vazia'})
            res.send(usuarios)
        }catch(erro){
            console.log(erro)
            res.status(500).send(erro)
        }
    },

    async inserir(req,res){
        
        const erros = validationResult(req)

        if(!erros.isEmpty()){
            return res.status(400).send(erros)
        }

        let usuario = req.body
        try{
            const retorno = await usuarioDao.inserir(usuario)
            usuario = {id: retorno.insertId, ...usuario}
            res.status(201).send(usuario)
        }catch(erro){
            console.log(erro)
            res.status(500).send(erro)
        }
    }



}

const usuarios = (app) => {

    //Mapeamento de comandos para a requisição no diretório /usuarios
    //Refatorado em 11/02
    //Antigo
    /*
    app.get('/usuarios', (req, res) => {

        const usuarioDao = app.model.Usuarios
        usuarioDao.listar()
            .then((lista) => {
                res.send(lista)
            })
            .catch((erro) =>{
                res.status(500).send(erro)
                console.log(erro)
            })
    })*/

    //Demonstra um comando que será executado se houver uma requisição GET, no caso enviando uma mensagem pelo método send()
    // app.get('/', (req, res) => {
    //     res.send('Root rote')
    // })

    //Refatorado em 11/02
    //Antigo
    /*
    app.post('/usuarios', ValidacoesUsuarios.validacoes(), (req,res) => {
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
          
    })*/

    //Rota para o caso de pesquisa de um email específico, deve verificar se o email já existe e retornar o usuário

    //Refatorado em 11/02
    //Antigo
    /*app.get('/usuarios/email/:email', (req, res) => {
        const email = req.params.email
        
        usuarioDao = app.model.Usuarios
        usuarioDao.buscarPorEmail(email)
            .then(retorno => {
                if(retorno){
                    res.send(retorno)
                }else{
                    //Retorna que o email não foi encontrado
                    res.status(404).send()
                }
            })
            .catch(erro => res.status(500).send(erro))
    })*/

}

//Exportando a função que possui as rotas
module.exports = usuarios