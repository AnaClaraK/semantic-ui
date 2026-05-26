const express = require('express');
const router = express.Router();
const produtosController = require('../controllers/produtosController.js'); // corrigido para plural 'controllers'

router.get('/produtos', produtosController.index);
router.delete('/produtos/:id', produtosController.delete);

module.exports = router;