const pool = require('../../db');

const ClienteModel = {

    listarTodos: async () => {
        const [rows] = await pool.execute(
            'SELECT * FROM clientes'
        );
        return rows;
    },

    criar: async (nome, telefone, cep) => {

        const [result] = await pool.execute(
            `INSERT INTO clientes
            (nome, telefone, cep)
            VALUES (?, ?, ?)`,
            [nome, telefone, cep]
        );

        return result.insertId;
    }
};

module.exports = ClienteModel;