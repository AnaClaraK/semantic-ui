const pool = require('../../db');

const produtos = {
 
    listarTodos: async () => {
        const [rows] = await pool.execute(
            'SELECT * FROM produtos'
        );
        return rows;
    },

    cadastrar: async (produto) => {

        const {
            nomeProduto,
            descricao,
            preco,
            categoria,
            status
        } = produto;

        const [result] = await pool.execute(
            `INSERT INTO produtos
            (nomeProduto, descricao, preco, categoria, status)
            VALUES (?, ?, ?, ?, ?)`,
            [
                nomeProduto,
                descricao,
                preco,
                categoria,
                status
            ]
        );

        return result;
    },

    atualizar: async (id_produto, produto) => {

        const {
            nomeProduto,
            descricao,
            preco,
            categoria,
            status
        } = produto;

        const [result] = await pool.execute(
            `UPDATE produtos
             SET nomeProduto = ?, descricao = ?, preco = ?, categoria = ?, status=?
             WHERE id_produto = ?`,
            [
                nomeProduto,
                descricao,
                preco,
                categoria,
                status,
                id_produto
            ]
        );

        return result;
    },

    deletar: async (id_produto) => {

        const [result] = await pool.execute(
            'DELETE FROM produtos WHERE id_produto = ?',
            [id_produto]
        );

        return result.affectedRows;
    }
};

module.exports = produtos;