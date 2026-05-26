const express = require('express');

const router = express.Router();

const produtosController = require('../controllers/produtosController');

// LISTAR
router.get('/produto', produtosController.index);

// CADASTRAR
router.post('/produto', produtosController.create);

// DELETAR
router.delete('/produto/:id', produtosController.delete);

module.exports = router;