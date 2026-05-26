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

module.exports = produtosController;