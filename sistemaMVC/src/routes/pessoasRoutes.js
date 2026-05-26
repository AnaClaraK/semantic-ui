const express = require('express')
const router = express.Router()
const pessoaController = require ('../controlers/pessoasController');

router.get('/pessoas', pessoasController.index)
router.delete('pessoas/:id',pessoaController)


module.exports = router