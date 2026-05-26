<<<<<<< HEAD
// const Produto = require('../models/produtosModel'); // O ideal futuramente é criar esse model

const produtosController = {
    index: async (req, res) => {
        try {
            // Nota: Mudei para tentar buscar de produtos caso crie o model futuramente
            // Se mantiver Pessoa, ele vai listar pessoas na rota de produtos.
            const produtos = await pool.execute('SELECT * FROM produtos'); 
            res.json(produtos[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    delete: async (req, res) => {
        const { id } = req.params;
        try {
            // Ajustado para simular a deleção na tabela correta de produtos
            const [result] = await pool.execute('DELETE FROM produtos WHERE id_produto = ?', [id]);
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Produto não encontrado" });
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};
=======
const produtos = require('../models/produtosModel');

const produtosController = {

    // LISTAR
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

    // CADASTRAR
    create: async (req, res) => {

        try {

            const resultado = await produtos.cadastrar(req.body);

            res.status(201).json({
                mensagem: "Produto cadastrado",
                resultado
            });

        } catch (error) {

            res.status(500).json({
                error: error.message
            });

        }
    },

    // DELETAR
    delete: async (req, res) => {

        const { id } = req.params;

        try {

            const affectedRows = await produtos.deletar(id);

            if (affectedRows === 0) {

                return res.status(404).json({
                    mensagem: "Produto não encontrado"
                });

            }

            res.status(204).send();

        } catch (error) {

            res.status(500).json({
                error: error.message
            });

        }
    }
}
>>>>>>> 02b810de5fc5fc6958a59de05385f044efeb83f4

module.exports = produtosController;