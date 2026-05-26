const ClienteModel = require('../models/clienteModel');

const clienteController = {
    inserirCliente: async (req, res) => {
        try {
            const { nome, telefone, horario, servicofeito, preco } = req.body;

            const insertId = await ClienteModel.criar(nome, telefone, horario, servicofeito, Number(preco));

            return res.status(201).json({ id: insertId, ...req.body });
        } catch (error) {
            console.error("Erro no Controller:", error);
            return res.status(500).json({ error: error.message });
        }
    }
};

module.exports = clienteController;