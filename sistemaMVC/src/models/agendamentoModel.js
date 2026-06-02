const pool = require('../../db.js');

const AgendamentoModel = {

    // 🔹 LISTAR TODOS
    listarTodos: async () => {
        const [rows] = await pool.execute('SELECT * FROM agendamentos');
        return rows;
    },

    // 🔹 BUSCAR POR ID
    buscarPorId: async (id) => {
        const [rows] = await pool.execute(
            'SELECT * FROM agendamentos WHERE id_agendamento = ?',
            [id]
        );
        return rows[0];
    },

    // 🔹 CRIAR
    criar: async (nome_cliente, telefone, servico, profissional, data_agendamento, horario) => {
        const query = `
            INSERT INTO agendamentos
            (nome_cliente, telefone, servico, profissional, data_agendamento, horario)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        const values = [
            nome_cliente,
            telefone,
            servico,
            profissional,
            data_agendamento,
            horario
        ];

        const [result] = await pool.execute(query, values);
        return result.insertId;
    },

    // 🔹 ATUALIZAR
    atualizar: async (id, dados) => {
        const query = `
            UPDATE agendamentos
            SET nome_cliente = ?, telefone = ?, servico = ?, profissional = ?, data_agendamento = ?, horario = ?
            WHERE id_agendamento = ?
        `;

        const values = [
            dados.nome_cliente,
            dados.telefone,
            dados.servico,
            dados.profissional,
            dados.data_agendamento,
            dados.horario,
            id
        ];

        const [result] = await pool.execute(query, values);
        return result.affectedRows > 0;
    },

    // 🔹 DELETE
    deletar: async (id) => {
        const [result] = await pool.execute(
            'DELETE FROM agendamentos WHERE id_agendamento = ?',
            [id]
        );
        return result.affectedRows > 0;
    }
};

module.exports = AgendamentoModel;