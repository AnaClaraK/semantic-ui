const produtos = require('../models/produtosModel');

const produtosController = {

    index: async (req, res) => {
        try {
            const lista = await produtos.listarTodos();
            res.json(lista);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    create: async (req, res) => {
        try {
            const resultado = await produtos.cadastrar(req.body);

            res.status(201).json({
                mensagem: 'Produto cadastrado com sucesso!',
                resultado
            });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    update: async (req, res) => {

        try {

            const { id } = req.params;

            const resultado = await produtos.atualizar(
                id,
                req.body
            );

            res.json({
                mensagem: 'Produto atualizado com sucesso!',
                resultado
            });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    delete: async (req, res) => {

        try {

            const { id } = req.params;

            const affectedRows =
                await produtos.deletar(id);

            if (affectedRows === 0) {
                return res.status(404).json({
                    mensagem: 'Produto não encontrado'
                });
            }

            res.status(204).send();

        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    }
};

module.exports = produtosController;