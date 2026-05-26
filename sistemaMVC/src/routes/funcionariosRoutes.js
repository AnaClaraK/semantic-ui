const express = require('express');
const router = express.Router();
const funcionariosController = require('../controllers/funcionariosController');

// Rota para cadastrar funcionário do salão
router.post('/funcionarios', funcionariosController.store);

module.exports = router;