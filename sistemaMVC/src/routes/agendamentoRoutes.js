const express = require('express');
const router = express.Router();

const agendamentoController = require('../controllers/agendamentoController');

// GET todos
router.get('/', agendamentoController.listarTodos);

// GET por ID
router.get('/:id', agendamentoController.buscarPorId);

// POST
router.post('/', agendamentoController.inserirAgendamento);

// PUT
router.put('/:id', agendamentoController.atualizar);

// DELETE
router.delete('/:id', agendamentoController.deletar);

module.exports = router;