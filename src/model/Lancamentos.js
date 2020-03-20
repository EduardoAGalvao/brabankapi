//Importando arquivo de conexão com o database
const conexao = require('../config/conexao-db')

//Obtendo baseQuery para qualquer operação SQL
const baseQuery = require('./baseQuery')

//Essa classe irá conter toda a parte de comunicação com banco de dados em relação aos métodos
class Lancamento{

    //O base query foi utilizado para fazer o mesmo processo para todos, já que são repetidos

    listar(){

        //Modo Novo
        return baseQuery('SELECT * FROM lancamento')

    }

}

module.exports = Lancamento