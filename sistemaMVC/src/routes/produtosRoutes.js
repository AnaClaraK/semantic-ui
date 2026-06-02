const express = require("express");
const router = express.Router();
const pool = require("../../db");

router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM produtos');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    const { nome, descricao, preco, categoria } = req.body;

    const query = `
    INSERT INTO produtos
    (nome, descricao, categoria, preco)
    VALUES (?, ?, ?, ?, ?)
    `;

    const values = [
        nome,
        descricao,
        preco,
        categoria
    ];
    try {
        const [result] = await pool.execute(query, values);
        res.status(201).json({ id: result.insertId, ...req.body });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, descricao, preco, categoria } = req.body;
    const query = `UPDATE produtos SET nome = ?, descricao = ?, preco = ?, categoria = ? WHERE id = ?`;
    const values = [nome, descricao, preco, categoria, id];

    try {
        const [result] = await pool.execute(query, values);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.json({ id, ...req.body });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.execute('DELETE FROM produtos WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;