//Importando arquivo de conexão com o database
const conexao = require('../config/conexao-db')

//Abaixo o corpo da baseQuery
//é utilizada para receber qualquer comando SQL 
//e utiliza-lo com ou sem parâmetros adicionais pelo comando query()
module.exports = (sql, params) => {
    return new Promise((resolve, reject) => {
        {/*Condicional para a variável params, se estiver preenchida retornará seu conteúdo, senão retornará vazio */}
        conexao.query(sql,params || '', (erro, retorno) => {
            if(erro) return reject(erro)
            resolve(retorno)
        })
    })
}