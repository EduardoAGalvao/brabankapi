
module.exports = (app) =>{

    app.get('/categorias', (req, res) => {
        res.send('todas as categorias estão aqui')
    })
}