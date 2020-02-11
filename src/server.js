const express = require('express')
const app = express()
const auth = require('./routers/authRoutes')
const categoria = require('./routers/categoriaRoutes')
const authMid = require('./middlewares/auth')

app.use(express.json())

app.use('/', auth)

app.use(authMid)

app.use('/categorias', categoria)

module.exports = app