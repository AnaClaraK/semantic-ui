const express = require('express');
const router = express.Router();

const clienteController =
require('../controllers/clienteController');

router.get('/clientes', clienteController.listar);
router.post('/clientes', clienteController.inserirCliente);

module.exports = router;