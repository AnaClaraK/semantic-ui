const pool = require('../config/db');

const produtos = {

    // LISTAR
    listarTodos: async () => {

        const [rows] = await pool.execute(
            'SELECT * FROM produtos'
        );

        return rows;
    },

    // CADASTRAR
    cadastrar: async (produto) => {

        const {
            nomeProduto,
            descricao,
            categoria,
            preco,
            estoque,
            status
        } = produto;

        const [result] = await pool.execute(

            `INSERT INTO produtos
            (nomeProduto, descricao, categoria, preco, estoque, status)
            VALUES (?, ?, ?, ?, ?, ?)`,

            [
                nomeProduto,
                descricao,
                categoria,
                preco,
                estoque,
                status
            ]
        );

        return result;
    },

    // DELETAR
    deletar: async (id) => {

        const [result] = await pool.execute(
            'DELETE FROM produtos WHERE id_produto = ?',
            [id]
        );

        return result.affectedRows;
    }
}

module.exports = produtos;