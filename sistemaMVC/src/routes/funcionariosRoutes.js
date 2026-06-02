const express = require("express");
const router = express.Router();
const pool = require("../../db");

// ==========================================
// 1. GET - LISTAR TODOS OS FUNCIONÁRIOS
// URL: GET http://localhost:3000/funcionariosRoutes
// ==========================================
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM funcionarios');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ==========================================
// 2. GET - FILTRAR APENAS CABELEIREIROS
// URL: GET http://localhost:3000/funcionariosRoutes/cabeleireiros
// ==========================================
router.get('/cabeleireiros', async (req, res) => {
    try {
        const [rows] = await pool.execute(`
            SELECT id_funcionario, nome, cargo
            FROM funcionarios
            WHERE cargo LIKE '%Cabeleireiro%'
        `);
        res.json(rows);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
});

// ==========================================
// 3. POST - CADASTRAR FUNCIONÁRIO
// URL: POST http://localhost:3000/funcionariosRoutes
// ==========================================
router.post('/', async (req, res) => {
    const { nome, cargo, telefone, especialidade, comissao_percentual, data_admissao } = req.body;
    
    if (!nome || !cargo) {
        return res.status(400).json({ error: "Nome e Cargo são obrigatórios." });
    }

    const query = `
        INSERT INTO funcionarios 
        (nome, cargo, telefone, especialidade, comissao_percentual, data_admissao) 
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [
        nome, 
        cargo, 
        telefone || null, 
        especialidade || 'Geral', 
        comissao_percentual || 0.00, 
        data_admissao || new Date().toISOString().slice(0, 10)
    ];

    try {
        const [result] = await pool.execute(query, values);
        res.status(201).json({ id_funcionario: result.insertId, ...req.body });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ==========================================
// 4. PUT - ATUALIZAR FUNCIONÁRIO EXISTENTE
// URL: PUT http://localhost:3000/funcionariosRoutes/:id
// ==========================================
// ==========================================
// 4. PUT - ATUALIZAR FUNCIONÁRIO EXISTENTE
// URL Correta: PUT http://localhost:3000/funcionarios/1
// ==========================================
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, cargo, telefone, specialty, comissao_percentual, data_admissao } = req.body;

    if (!nome || !cargo) {
        return res.status(400).json({ error: "Nome e Cargo são obrigatórios para atualização." });
    }

    // Importante: Verifique se no seu banco de dados a coluna se chama id_funcionario ou apenas id
    const query = `
        UPDATE funcionarios 
        SET nome = ?, cargo = ?, telefone = ?, especialidade = ?, comissao_percentual = ?, data_admissao = ?
        WHERE id_funcionario = ?
    `;
    
    const values = [
        nome, 
        cargo, 
        telefone || null, 
        specialty || 'Geral', 
        comissao_percentual || 0.00, 
        data_admissao || null, 
        id
    ];

    try {
        const [result] = await pool.execute(query, values);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Funcionário não encontrado." });
        }
        
        res.json({ message: "Funcionário atualizado com sucesso!", id_funcionario: id });
    } catch (error) {
        console.error("Erro no PUT:", error);
        res.status(500).json({ error: error.message });
    }
});

// ==========================================
// 5. DELETE - EXCLUIR FUNCIONÁRIO
// URL Correta: DELETE http://localhost:3000/funcionarios/1
// ==========================================
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.execute('DELETE FROM funcionarios WHERE id_funcionario = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Funcionário não encontrado." });
        }

        res.status(200).json({ message: `Funcionário excluído com sucesso.` });
    } catch (error) {
        console.error("Erro no DELETE:", error);
        res.status(500).json({ error: error.message });
    }
});
module.exports = router;