const ClienteModel = require('../models/clienteModel');

const clienteController = {

    listar: async (req, res) => {
        try {
            const clientes = await ClienteModel.listarTodos();
            res.json(clientes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    inserirCliente: async (req, res) => {
        try {

            const { nome, telefone, cep } = req.body;

            const id = await ClienteModel.criar(
                nome,
                telefone,
                cep
            );

            res.status(201).json({
                id_cliente: id,
                nome,
                telefone,
                cep
            });

        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    }
};

module.exports = clienteController;