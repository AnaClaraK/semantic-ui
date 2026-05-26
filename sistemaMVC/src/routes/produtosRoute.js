const express = require('express')
const router = express.Router()
const produtosController = require ('../controller/produtosController.js')


router.get('/', (req, res) => {
    res.send('rota funcionando')
})

module.exports = router