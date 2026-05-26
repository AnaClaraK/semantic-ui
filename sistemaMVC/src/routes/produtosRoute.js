const express = require('express');
<<<<<<< HEAD
const router = express.Router();
const produtosController = require('../controllers/produtosController.js'); // corrigido para plural 'controllers'

router.get('/produtos', produtosController.index);
router.delete('/produtos/:id', produtosController.delete);

=======

const router = express.Router();

const produtosController = require('../controllers/produtosController');

// LISTAR
router.get('/produto', produtosController.index);

// CADASTRAR
router.post('/produto', produtosController.create);

// DELETAR
router.delete('/produto/:id', produtosController.delete);

>>>>>>> 02b810de5fc5fc6958a59de05385f044efeb83f4
module.exports = router;