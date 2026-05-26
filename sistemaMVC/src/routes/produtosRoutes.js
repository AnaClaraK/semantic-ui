const express = require('express');
const router = express.Router();
const produtosController = require('../controllers/produtosController');

// LISTAR
router.get('/produtos', produtosController.index);

// CADASTRAR
router.post('/produtos', produtosController.create);

// DELETAR
router.delete('/produtos/:id', produtosController.delete);

module.exports = router;