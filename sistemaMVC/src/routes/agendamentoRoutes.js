const express = require('express');
const router = express.Router();

const agendamentoController = require('../controllers/agendamentoController');

// Criar agendamento
router.post(
    '/',
    agendamentoController.inserirAgendamento
);

module.exports = router;