require('dotenv').config();
const express = require('express')
const cors = require('cors')
const pessoaRoute = require('./src/routes/pessoasRoutes.js');
const produtosRoute = require('./src/routes/produtosRoute.js')
const agendamentoRoute = require('./src/routes/agendamentoRoutes.js');

const app = express()
app.use(cors())
app.use(express.json())

app.use(pessoaRoute)
app.use(produtosRoute)
app.use(agendamentoRoute)

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server em http://localhost:${PORT}`))