require('dotenv').config();
const express = require('express')
const cors = require('cors')
const pessoaRoute = require('./src/routes/pessoasRoutes.js');

const app = express()
app.use(cors())
app.use(express.json())

app.use(pessoaRoute)

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server em http://localhost:${PORT}`))