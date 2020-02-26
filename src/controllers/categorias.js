//Realizando instância do objeto Categorias
const categoriaDao = new (require('../model/Categorias'))()

//Obtendo o validadionResult do express-validator
//ele intercepta os erros de uma requisição, retornando seus parâmetros, 
//como a mensagem de erro, parâmetro, locais, valores, entre outros
const {validationResult} = require('express-validator')

module.exports = {

    //Listando as categorias
    async listar(req,res) {
        try{
            const categorias = await categoriaDao.listar()
            if(categorias.length == 0)
            return res.status(404).send({erro: 'Lista vazia'})
            
            res.send(categorias)
        }catch(erro){
            console.log(erro)
            res.status(500).send(erro)
        }
    },

    //Inserindo uma nova categoria
    async inserir(req,res){

        const erros = validationResult(req)

        if(!erros.isEmpty())
        return res.status(400).send(erros)

        let categoria = req.body

        try{
            const resultado = await categoriaDao.inserir(categoria)
            categoria = {id: resultado.insertId, ...categoria}

            res.status(201).send(categoria)
        }catch(erro){
            console.log(erro)
            res.status(500).send(erro)
        }
    }

    //Refatorado em 11/02 - será enviado para arquivo de rotas
    /*
    app.get('/categorias', (req, res) => {
        res.send('todas as categorias estão aqui')
    })*/
}