const mysql = require('mysql')

//createConnection() espera um JSON com as configurações
const conexao = mysql.createConnection({
    host: '54.84.37.100',
    port: 3306,
    user: 'eduardo',
    password: 'senaibcd127',
    database: 'brabank'
})

module.exports = conexao