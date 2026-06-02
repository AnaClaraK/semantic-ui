const pool = require('../../db');

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
            nome,
            descricao,
            categoria,
            preco
        } = produto;

        const [result] = await pool.execute(

            `INSERT INTO produtos
            (nome, descricao, categoria, preco)
            VALUES (?, ?, ?, ?, ?, ?)`,

            [
                nome,
                descricao,
                categoria,
                preco
                
            ]
        );

        return result;
    },

    // DELETAR
    deletar: async (id) => {

        const [result] = await pool.execute(
            'DELETE FROM produtos WHERE id = ?',
            [id]
        );

        return result.affectedRows;
    }
}

module.exports = produtos;