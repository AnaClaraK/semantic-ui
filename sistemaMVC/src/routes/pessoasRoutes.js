const express = require('express');
const router = express.Router();
const pessoaController = require('../controllers/pessoasController');

// Rotas do CRUD de Pessoas
router.get('/pessoa', pessoaController.index);
router.post('/pessoas', pessoaController.store);
router.put('/pessoas/:id', pessoaController.update);
router.delete('/pessoa/:id', pessoaController.delete);

module.exports = router;