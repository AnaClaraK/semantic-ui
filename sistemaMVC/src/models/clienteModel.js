const pool = require('../../db');

const ClienteModel = {

    listarTodos: async () => {
        const [rows] = await pool.execute(
            'SELECT * FROM clientes'
        );
        return rows;
    },

    criar: async (nome, telefone, horario, servicofeito, preco) => {
        const [result] = await pool.execute(
            `INSERT INTO clientes
            (nome, telefone, horario, servicofeito, preco)
            VALUES (?, ?, ?, ?, ?)`,
            [nome, telefone, horario, servicofeito, preco]
        );

        return result.insertId;
    },

    atualizar: async (id_cliente, nome, telefone, horario, servicofeito, preco) => {
        const [result] = await pool.execute(
            `UPDATE clientes 
            SET nome = ?, telefone = ?, horario = ?, servicofeito = ?, preco = ? 
            WHERE id_cliente = ?`,
            [nome, telefone, horario, servicofeito, preco, id_cliente]
        );
        return result.affectedRows;
    },

    deletar: async (id_cliente) => {
        const [result] = await pool.execute(
            `DELETE FROM clientes 
            WHERE id_cliente = ?`,
            [id_cliente]
        );
        return result.affectedRows;
    }
};

module.exports = ClienteModel;