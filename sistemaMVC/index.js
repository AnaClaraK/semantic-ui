require('dotenv').config
const express = require('express')
const cors = require('cors')
const pessoasRoute = require('./src/routes/pessoasRoutes');

const app = express()
app.use(cors())
app.use(express.json())

app.use(pessoasRoute)

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`server em http://localhost:{PORT}`))