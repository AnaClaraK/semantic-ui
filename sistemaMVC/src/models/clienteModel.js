const pool = require('../../db');

const ClienteModel = {
   
    criar: async (nome, telefone, horario, servicofeito, preco) => {
        const query = `
            INSERT INTO clientes 
            (nome, telefone, horario, servicofeito, preco) 
            VALUES (?, ?, ?, ?, ?)
        `;
        const values = [nome, telefone, horario, servicofeito, preco];
        const [result] = await pool.execute(query, values);
        return result.insertId; 
    }
};

module.exports = ClienteModel;