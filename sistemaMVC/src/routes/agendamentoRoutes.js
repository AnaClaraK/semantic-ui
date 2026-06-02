const express = require('express');
const router = express.Router();
const agendamentoController = require('../controllers/agendamentoController');
router.post('/agendamento', agendamentoController.inserirAgendamento);
module.exports = router;