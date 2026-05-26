const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

// Define a rota POST e aponta para a função do controller
router.post('/inserircliente', clienteController.inserirCliente);

module.exports = router;