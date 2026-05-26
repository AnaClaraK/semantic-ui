const pool = require('../config/db');

const Funcionario = {
    criar: async (dados) => {
        const query = `
        INSERT INTO funcionarios 
        (nome, cargo, telefone, especialidade, comissao_percentual, data_admissao) 
        VALUES (?, ?, ?, ?, ?, ?)
        `;
        
        const values = [
            dados.nome, 
            dados.cargo, // Ex: 'Cabeleireiro', 'Assistente'
            dados.telefone || null, 
            dados.especialidade || 'Geral', // Ex: 'Cortes', 'Colorimetria'
            dados.comissao_percentual || 0.00, 
            dados.data_admissao || new Date().toISOString().slice(0, 10) // Data de hoje caso venha vazio
        ];

        const [result] = await pool.execute(query, values);
        return result.insertId;
    }
};

module.exports = Funcionario;