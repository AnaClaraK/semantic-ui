const express = require("express");
const router = express.Router();
const pool = require("../../db");

router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM funcionarios');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    const { nome, cargo, telefone, especialidade, comissao_percentual, data_admissao } = req.body;
    if (!nome || !cargo) {
        return res.status(400).json({ error: "Nome e Cargo são obrigatórios." });
    }

    const query = `INSERT INTO funcionarios (nome, cargo, telefone, especialidade, comissao_percentual, data_admissao) VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [nome, cargo, telefone || null, especialidade || 'Geral', comissao_percentual || 0.00, data_admissao || new Date().toISOString().slice(0, 10)];

    try {
        const [result] = await pool.execute(query, values);
        res.status(201).json({ id_funcionario: result.insertId, ...req.body });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/cabeleireiros', async (req, res) => {
    try {

        const [rows] = await pool.execute(`
            SELECT id_funcionario, nome
            FROM funcionarios
            WHERE cargo = 'Cabeleireiro Pleno'
        `);

        res.json(rows);

    } catch(error) {
        res.status(500).json({
            error: error.message
        });
    }
});
module.exports = router;