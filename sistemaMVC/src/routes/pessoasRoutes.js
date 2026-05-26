const express = require('express')
const router = express.Router()
const pessoaController = require ('../controllers/pessoasController')



router.get('/pessoa', pessoaController.index);
router.delete('/pessoa/:id', pessoaController.delete)

module.exports = router