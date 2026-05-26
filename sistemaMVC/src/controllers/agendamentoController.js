const AgendamentoModel = require('../models/agendamentoModel');

const agendamentoController = {
    inserirAgendamento: async (req, res) => {
        try {
            const {
                nome_cliente,
                telefone,
                servico,
                profissional,
                data_agendamento,
                horario
            } = req.body;

            const insertId = await AgendamentoModel.criar(
                nome_cliente,
                telefone,
                servico,
                profissional,
                data_agendamento,
                horario
            );

            return res.status(201).json({
                id: insertId,
                ...req.body
            });

        } catch (error) {
            console.error("Erro no Controller:", error);
            return res.status(500).json({ error: error.message });
        }
    }
};

module.exports = agendamentoController;