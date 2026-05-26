const pool = require('../config;db')

const Pessoa = {
    listarTodos: async () =>{
        const [rows] = await pool.execute('SELECT * FROM pessoas')
        return rows;
    },
    deletar: async (id) =>{
        const [result] = await pool.execute('DELETE FROM PESSOAS WHERE id = ?', [id]);
        return result.affectedRows;
    }
} 