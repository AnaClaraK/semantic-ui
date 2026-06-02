const express = require('express');
const router = express.Router();

const clienteController = require('../controllers/clienteController');

router.get('/clientes', clienteController.listar);

router.post('/clientes', clienteController.inserirCliente);
router.post('/inserircliente', clienteController.inserirCliente);

router.put('/clientes/:id', clienteController.atualizarCliente);
router.delete('/clientes/:id', clienteController.deletarCliente);

module.exports = router;