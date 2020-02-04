const jwt = require('jsonwebtoken')
const auth = require('../config/auth')

module.exports = (app) => {
    app.use(mid)
}

const mid = async (req,res,next) => {
    const authHeader = req.headers.authorization

    //Verifica se tem authorization no Header
    if(!authHeader){
        res.status(401).send({erro: 'Token não informado'})
    }

    const parts = authHeader.split(' ')

    //Verifica se o authorization tem duas partes
    if(parts.length !== 2){
        return res.status(401).send({erro: 'Erro no token'})
    }

    const [bearer, token] = parts

    //Verifica se a primeira parte contém o Bearer
    if(!/^Bearer$/i.test(bearer)){
        return res.status(401).send({erro: 'Token mal formatado'})
    }

    //Verifica se o token é válido
    try{
        const decoded = await jwt.verify(token, auth.secret)
        req.userId = decoded.id
        return next()
    }catch(erro){
        res.status(401).send({erro: 'Token inválido'})
    }
    
}