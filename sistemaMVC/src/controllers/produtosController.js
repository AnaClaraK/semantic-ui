const produtos = require('../models/produtosModel');

const produtosController = {

    // LISTAR TODOS OS PRODUTOS
    index: async (req, res) => {
        try {
            const lista = await produtos.listarTodos();
            res.json(lista);
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    },

    // CADASTRAR NOVO PRODUTO
    create: async (req, res) => {
        try {
            const resultado = await produtos.cadastrar(req.body);
            res.status(201).json({
                mensagem: "Produto cadastrado com sucesso!",
                resultado
            });
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    },

    // DELETAR PRODUTO POR ID
    delete: async (req, res) => {
        const { id } = req.params;
        try {
            const affectedRows = await produtos.deletar(id);

            if (affectedRows === 0) {
                return res.status(404).json({
                    mensagem: "Produto não encontrado"
                });
            }

            res.status(204).send(); // Retorna sucesso sem corpo (padrão para exclusão)
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    }
};

// ATENÇÃO: Exportando o controller apenas uma vez no fim do arquivo
module.exports = produtosController;