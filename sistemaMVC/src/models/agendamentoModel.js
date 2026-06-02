const pool = require('../../db.js');

const AgendamentoModel = {
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
    }
};

module.exports = AgendamentoModel;