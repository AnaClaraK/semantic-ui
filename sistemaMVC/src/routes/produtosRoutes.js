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
    const { nomeProduto, descricao, preco, estoque, categoria } = req.body;
    const query = `INSERT INTO produtos (nomeProduto, descricao, preco, estoque, categoria) VALUES (?, ?, ?, ?, ?)`;
    const values = [nomeProduto, descricao, preco, estoque, categoria];

    try {
        const [result] = await pool.execute(query, values);
        res.status(201).json({ id: result.insertId, ...req.body });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nomeProduto, descricao, preco, estoque, categoria } = req.body;
    const query = `UPDATE produtos SET nomeProduto = ?, descricao = ?, preco = ?, estoque = ?, categoria = ? WHERE id_produto = ?`;
    const values = [nomeProduto, descricao, preco, estoque, categoria, id];

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
        const [result] = await pool.execute('DELETE FROM produtos WHERE id_produto = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;