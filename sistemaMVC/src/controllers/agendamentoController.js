const AgendamentoModel = require('../models/agendamentoModel');

const agendamentoController = {

    // 🔹 GET - listar todos
    listarTodos: async (req, res) => {
        try {
            const agendamentos = await AgendamentoModel.listarTodos();
            return res.status(200).json(agendamentos);
        } catch (error) {
            console.error("Erro ao listar:", error);
            return res.status(500).json({ error: error.message });
        }
    },

    // 🔹 GET por ID
    buscarPorId: async (req, res) => {
        try {
            const { id } = req.params;
            const agendamento = await AgendamentoModel.buscarPorId(id);

            if (!agendamento) {
                return res.status(404).json({ message: "Agendamento não encontrado" });
            }

            return res.status(200).json(agendamento);
        } catch (error) {
            console.error("Erro ao buscar:", error);
            return res.status(500).json({ error: error.message });
        }
    },

    // 🔹 POST - criar
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
            console.error("Erro ao inserir:", error);
            return res.status(500).json({ error: error.message });
        }
    },

    // 🔹 PUT - atualizar
    atualizar: async (req, res) => {
        try {
            const { id } = req.params;
            const dados = req.body;

            const atualizado = await AgendamentoModel.atualizar(id, dados);

            if (!atualizado) {
                return res.status(404).json({ message: "Agendamento não encontrado" });
            }

            return res.status(200).json({ message: "Atualizado com sucesso" });

        } catch (error) {
            console.error("Erro ao atualizar:", error);
            return res.status(500).json({ error: error.message });
        }
    },

    // 🔹 DELETE
    deletar: async (req, res) => {
        try {
            const { id } = req.params;

            const deletado = await AgendamentoModel.deletar(id);

            if (!deletado) {
                return res.status(404).json({ message: "Agendamento não encontrado" });
            }

            return res.status(200).json({ message: "Deletado com sucesso" });

        } catch (error) {
            console.error("Erro ao deletar:", error);
            return res.status(500).json({ error: error.message });
        }
    }
};

module.exports = agendamentoController;