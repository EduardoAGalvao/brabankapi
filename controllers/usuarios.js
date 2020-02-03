const {validationResult} = require('express-validator')
const ValidacoesUsuarios = require('../validators/ValidacoesUsuarios')

const usuarios = (app) => {

    //Mapeamento de comandos para a requisição no diretório /usuarios
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
        
        /*
        const usuario = {nome: 'Eduardo', senha: 'senha12'}
        res.send(usuario)
        */
    })

    //Demonstra um comando que será executado se houver uma requisição GET, no caso enviando uma mensagem pelo método send()
    app.get('/', (req, res) => {
        res.send('Root rote')
    })

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
          
    })

    //Rota para o caso de pesquisa de um email específico, deve verificar se o email já existe e retornar o usuário
    app.get('/usuarios/email/:email', (req, res) => {
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
    })

}

//Exportando a função que possui as rotas
module.exports = usuarios