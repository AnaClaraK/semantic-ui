const express = require("express");
const router = express.Router();
const pool = require("../../db"); // Mantido o seu caminho padrão de importação do pool

// LISTAR TODAS AS PESSOAS
// URL Completa: GET http://localhost:3000/pessoas
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM pessoa');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// CADASTRAR NOVA PESSOA
// URL Completa: POST http://localhost:3000/pessoas
router.post('/', async (req, res) => {
    const { 
        nome_razao_social, nome_social_fantasia, cep, endereco, 
        numero, bairro, cidade, estado, pais, documento, tipo, email 
    } = req.body;

    // Validação estrita dos campos mandatórios (Não Nulos na tabela do banco)
    if (!nome_razao_social || !documento || !tipo) {
        return res.status(400).json({ 
            error: "Campos obrigatórios ausentes: nome_razao_social, documento e tipo são mandatórios." 
        });
    }

    const query = `
        INSERT INTO pessoa
        (nome_razao_social, nome_social_fantasia, cep, endereco, numero, bairro, cidade, estado, pais, documento, tipo, email) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    const values = [
        nome_razao_social, 
        nome_social_fantasia || null, 
        cep || null, 
        endereco || null, 
        numero || null, 
        bairro || null, 
        cidade || null, 
        estado || null, 
        pais || 'Brasil', 
        documento, 
        tipo, // Deve vir do frontend estritamente como 'CPF' ou 'CNPJ'
        email || null
    ];

    try {
        const [result] = await pool.execute(query, values);
        res.status(201).json({ id: result.insertId, ...req.body });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ATUALIZAR PESSOA
// URL Completa: PUT http://localhost:3000/pessoas/:id
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { 
        nome_razao_social, nome_social_fantasia, cep, endereco, 
        numero, bairro, cidade, estado, pais, documento, tipo, email 
    } = req.body;

    if (!nome_razao_social || !documento || !tipo) {
        return res.status(400).json({ error: "Campos obrigatórios ausentes para atualização." });
    }

    const query = `
        UPDATE pessoa 
        SET nome_razao_social = ?, nome_social_fantasia = ?, cep = ?, endereco = ?, 
            numero = ?, bairro = ?, cidade = ?, estado = ?, pais = ?, documento = ?, 
            tipo = ?, email = ? 
        WHERE id = ?
    `;
    
    const values = [
        nome_razao_social, nome_social_fantasia || null, cep || null, endereco || null, 
        numero || null, bairro || null, cidade || null, estado || null, pais || 'Brasil', 
        documento, tipo, email || null, id
    ];

    try {
        const [result] = await pool.execute(query, values);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Registro não encontrado' });
        }
        res.json({ id, ...req.body });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// REMOVER PESSOA
// URL Completa: DELETE http://localhost:3000/pessoas/:id
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.execute('DELETE FROM pessoa WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Registro não encontrado' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;