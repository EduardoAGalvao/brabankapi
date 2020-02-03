const {check, body} = require('express-validator')
const usuarioDao = require('../model/Usuarios')

class ValidacoesUsuarios{

    static validacoes(){
        return[
            check('nome').isLength({min: 5, max: 100}).withMessage("Campo nome deve ter no mínimo 5 caracteres e no máximo 100 caracteres."),
            check('email').isEmail().withMessage("Por gentileza, insira um email válido"),
            check('cpf').isNumeric().withMessage("Deve conter apenas números"),
            check('sexo').isLength({min: 1, max: 1}).withMessage("Deve conter 1 sigla"),
            check('senha').isLength({min: 6, max: 15}).withMessage("A senha deve conter entre 6 e 15 caracteres"),
            body('email').custom((email) => {
                return usuarioDao.buscarPorEmail(email)
                    .then((retorno) =>{
                        if(retorno){
                            return Promise.reject('Email já cadastrado')
                        }
                    })
            })
        ]
    }

}

module.exports = ValidacoesUsuarios