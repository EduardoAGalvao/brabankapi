//Importando arquivo de conexão com o database
const conexao = require('../config/conexao-db')

class Usuarios{

    listar(){
        return new Promise((resolve, reject) => {
            const sql = ' SELECT * FROM usuario'

            conexao.query(sql, (erro, retorno) =>{
                if(erro){
                    reject('Erro ao consultar: ' + erro)
                    //Esse return irá parar a execução do código, caso não pare segue para o resolve()
                    return 
                }
                
                console.log('consultado com sucesso')
                resolve(retorno)
            })
        })
    }

    inserir(usuario){
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO usuario SET ?'
            //O nome do objeto json deve ser o mesmo do banco de dados
            conexao.query(sql, usuario, (erro, retorno) => {
                //Solução para exibir o usuário assim que ele for inserido, solução proposta para o professor
                //erro ? reject("Erro ao inserir: " + erro) : resolve({id: retorno.insertId, ...usuario})

                erro ? reject("Erro ao inserir: " + erro) : resolve(retorno)
            })
        })
    }

    buscarPorEmail(email){
        return new Promise((resolve, reject) => {

            const sql = 'SELECT * FROM usuario where email = ?'

            conexao.query(sql, email, (erro, retorno) => {
                if(erro){
                    reject('Erro ao consultar: ' + erro)
                }else{
                    //Se não tiver erro, armazena o usuário encontrado em uma variável e o retorna
                    const usuarioEncontrado = retorno[0]
                    resolve(usuarioEncontrado)

                    //Método antigo
                    // if(usuarioEncontrado){
                    //     resolve(usuarioEncontrado)
                    // }else{
                    //     reject({erro: "Usuário não encontrado"})
                    // }
                }
            })
        })
    }

}

module.exports = new Usuarios()