//Importando as configurações do express criadas pelo desenvolvedor
const app = require('./config/custom-express')

//Listener para evento de inserção no servidor
app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000")
})