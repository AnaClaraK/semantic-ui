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
            const { nome, telefone, horario, servicofeito, preco } = req.body;

            const id = await ClienteModel.criar(
                nome,
                telefone,
                horario,
                servicofeito,
                preco
            );

            res.status(201).json({
                id_cliente: id,
                nome,
                telefone,
                horario,
                servicofeito,
                preco
            });

        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    },

    atualizarCliente: async (req, res) => {
        try {
            const { id } = req.params; 
            const { nome, telefone, horario, servicofeito, preco } = req.body;

            const rowsAffected = await ClienteModel.atualizar(id, nome, telefone, horario, servicofeito, preco);

            if (rowsAffected === 0) {
                return res.status(404).json({ error: "Cliente não encontrado." });
            }

            res.json({
                message: "Cliente atualizado com sucesso!",
                id_cliente: id,
                nome,
                telefone,
                horario,
                servicofeito,
                preco
            });
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    },

    deletarCliente: async (req, res) => {
        try {
            const { id } = req.params; 

            const rowsAffected = await ClienteModel.deletar(id);

            if (rowsAffected === 0) {
                return res.status(404).json({ error: "Cliente não encontrado." });
            }

            res.json({ message: "Cliente deletado com sucesso!" });
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    }
};

module.exports = clienteController;