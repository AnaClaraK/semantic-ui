const ClienteModel = require('../models/clienteModel');

const clienteController = {
    inserirCliente: async (req, res) => {
        try {
            // Removido campos de agendamento e adicionado o cep
            const { nome, telefone, cep } = req.body;

            // Passando os novos parâmetros para o seu Model
            const insertId = await ClienteModel.criar(nome, telefone, cep);

            return res.status(201).json({ id: insertId, ...req.body });
        } catch (error) {
            console.error("Erro no Controller:", error);
            return res.status(500).json({ error: error.message });
        }
    }
};

module.exports = clienteController;