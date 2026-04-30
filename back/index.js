const express = require("express");
const app = express();

const cors = require("cors");
const mysql = require("mysql2/promise"); // 👈 IMPORTANTE (promise!)
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.use(cors());
app.use(express.json());

// Configuração do banco
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'exemplos'
};

// Criando pool corretamente com async/await
const pool = mysql.createPool(dbConfig);

// Teste de conexão
(async () => {
    try {
        const connection = await pool.getConnection();
        console.log('✅ Conexão com MySQL OK!');
        connection.release();
    } catch (error) {
        console.error('❌ Erro ao conectar no MySQL:', error.message);
    }
})();


// ================= ROTAS =================

// GET - Listar
app.get('/pessoa', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM pessoa');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// POST - Criar
app.post('/pessoa', async (req, res) => {
    const { 
        nome_razao_social, nome_social_fantasia, cep, endereco, 
        numero, bairro, cidade, estado, pais, documento, tipo, email 
    } = req.body;

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
        tipo,
        email || null
    ];

    try {
        const [result] = await pool.execute(query, values);
        res.status(201).json({ id: result.insertId, ...req.body });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// PUT - Atualizar
app.put('/pessoa/:id', async (req, res) => {
    const { id } = req.params;
    const { 
        nome_razao_social, nome_social_fantasia, cep, endereco, 
        numero, bairro, cidade, estado, pais, documento, tipo, email 
    } = req.body;

    const query = `
        UPDATE pessoa 
        SET nome_razao_social = ?, nome_social_fantasia = ?, cep = ?, endereco = ?, 
            numero = ?, bairro = ?, cidade = ?, estado = ?, pais = ?, documento = ?, 
            tipo = ?, email = ? 
        WHERE id = ?
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
        tipo,
        email || null,
        id
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


// DELETE - Remover
app.delete('/pessoa/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.execute(
            'DELETE FROM pessoa WHERE id = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Registro não encontrado' });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});