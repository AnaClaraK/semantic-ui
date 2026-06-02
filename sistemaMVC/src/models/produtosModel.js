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
            nome,
            descricao,
            preco,
            categoria
        } = produto;

        const [result] = await pool.execute(
            `INSERT INTO produtos
            (nome, descricao, preco, categoria)
            VALUES (?, ?, ?, ?)`,
            [
                nome,
                descricao,
                preco,
                categoria
            ]
        );

        return result;
    },

    atualizar: async (id, produto) => {

        const {
            nome,
            descricao,
            preco,
            categoria
        } = produto;

        const [result] = await pool.execute(
            `UPDATE produtos
             SET nome = ?, descricao = ?, preco = ?, categoria = ?
             WHERE id = ?`,
            [
                nome,
                descricao,
                preco,
                categoria,
                id
            ]
        );

        return result;
    },

    deletar: async (id) => {

        const [result] = await pool.execute(
            'DELETE FROM produtos WHERE id = ?',
            [id]
        );

        return result.affectedRows;
    }
};

module.exports = produtos;