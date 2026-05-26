const pool = require('../config/db')

const Pessoa = {
    ListarTodos: async () =>{
        const [rows] = await pool.execute('SELECT * FROM pessoa')
        return rows
    },
    deletar: async (id) =>{
        const [result] = await pool.execute('DELETE FROM pessoa WHERE id = ?', [id]);
        return result.affectedRows
    }
}

module.exports = Pessoa;