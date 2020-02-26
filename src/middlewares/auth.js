//Obtendo o JWT
//O JWT é um padrão (RFC-7519) de mercado que define como transmitir e armazenar objetos JSON 
//de forma compacta e segura entre diferentes aplicações. Os dados nele contidos podem ser 
//validados a qualquer momento pois o token é assinado digitalmente.
const jwt = require('jsonwebtoken')

//Obtem a chave "secret" que será utilizada posteriormente
const auth = require('../config/auth')

// module.exports = (app) => {
//     app.use(mid)
//o mid usado acima era uma const que possuia toda a função async abaixo
// }

module.exports = async (req,res,next) => {
    //Obtendo o cabeçalho da requisição
    const authHeader = req.headers.authorization

    //Verifica se tem authorization no Header
    if(!authHeader){
        res.status(401).send({erro: 'Token não informado'})
    }

    //Se houver um header, separa o mesmo em duas partes dividindo pelo espaço ' '
    const parts = authHeader.split(' ')

    //Verifica se o authorization tem duas partes
    if(parts.length !== 2){
        return res.status(401).send({erro: 'Erro no token'})
    }

    //Coleta as duas partes em duas variáveis
    const [bearer, token] = parts

    //Verifica se a primeira parte contém o Bearer
    if(!/^Bearer$/i.test(bearer)){
        return res.status(401).send({erro: 'Token mal formatado'})
    }

    //Verifica se o token é válido
    //jwt.verify() -> verifica a autorização do usuário, pelo token enviado e a variável de segurança secret
    try{
        const decoded = await jwt.verify(token, auth.secret)
        req.userId = decoded.id
        return next()
    }catch(erro){
        res.status(401).send({erro: 'Token inválido'})
    }
    
}