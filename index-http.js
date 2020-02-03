//Importação de http
const http = require('http')

//O método creteServer recebe como parâmetro uma requisição e uma response, assim como uma função
//A função end() irá exibir algo ao fim da transmissão de dados
const server = http.createServer((req, res) => {
    res.end("<h1>Atendendo à requisição</h1>")
})

//Ouvinte para o uso do servidor
//os parâmetros do listen() podem ser: porta, host, callBackFunction
server.listen(3000, () => {
    console.log("Servidor rodando na porta 3000")
})