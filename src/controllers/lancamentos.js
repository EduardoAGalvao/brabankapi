//Realizando instância do objeto Lancamentos
const lancamentoDao = new (require('../model/Lancamentos'))()

//Obtendo o validadionResult do express-validator
//ele intercepta os erros de uma requisição, retornando seus parâmetros, 
//como a mensagem de erro, parâmetro, locais, valores, entre outros
const {validationResult} = require('express-validator')

module.exports = {

    //Listando as categorias
    async listar(req,res) {
        try{
            const lancamentos = await lancamentoDao.listar()
            if(lancamentos.length == 0)
            return res.status(404).send({erro: 'Lista vazia'})
            
            res.send(lancamentos)
        }catch(erro){
            console.log(erro)
            res.status(500).send(erro)
        }
    }
}