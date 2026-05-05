require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();

app.use(cors());
app.use(express.json());


// ================= CONFIG BANCO =================

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// teste conexão
pool.getConnection()
    .then(conn => {
        console.log("✅ Banco conectado com sucesso!");
        conn.release();
    })
    .catch(err => {
        console.log("❌ Erro ao conectar no banco:");
        console.log(err.message);
    });


// =====================================================
// ROTAS PESSOAS
// =====================================================

// listar pessoas
app.get('/pessoas', async (req, res) => {
    try {
        const [rows] = await pool.execute(
            'SELECT * FROM pessoas ORDER BY id DESC'
        );

        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// cadastrar pessoa
app.post('/pessoas', async (req, res) => {
    try {

        const {
            nome_razao_social,
            nome_social_fantasia,
            cep,
            endereco,
            numero,
            bairro,
            cidade,
            estado,
            pais,
            documento,
            tipo,
            email
        } = req.body;

        const query = `
            INSERT INTO pessoas (
                nome_razao_social,
                nome_social_fantasia,
                cep,
                endereco,
                numero,
                bairro,
                cidade,
                estado,
                pais,
                documento,
                tipo,
                email
            )
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

        const [result] = await pool.execute(query, values);

        res.status(201).json({
            message: "Pessoa cadastrada com sucesso",
            id: result.insertId
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// editar pessoa
app.put('/pessoas/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const {
            nome_razao_social,
            nome_social_fantasia,
            cep,
            endereco,
            numero,
            bairro,
            cidade,
            estado,
            pais,
            documento,
            tipo,
            email
        } = req.body;

        const query = `
            UPDATE pessoas
            SET
                nome_razao_social=?,
                nome_social_fantasia=?,
                cep=?,
                endereco=?,
                numero=?,
                bairro=?,
                cidade=?,
                estado=?,
                pais=?,
                documento=?,
                tipo=?,
                email=?
            WHERE id=?
        `;

        const values = [
            nome_razao_social,
            nome_social_fantasia,
            cep,
            endereco,
            numero,
            bairro,
            cidade,
            estado,
            pais,
            documento,
            tipo,
            email,
            id
        ];

        await pool.execute(query, values);

        res.json({
            message: "Pessoa atualizada com sucesso"
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// excluir pessoa
app.delete('/pessoas/:id', async (req, res) => {
    try {
        const { id } = req.params;

        await pool.execute(
            'DELETE FROM pessoas WHERE id=?',
            [id]
        );

        res.json({
            message: "Pessoa removida com sucesso"
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// =====================================================
// ROTAS PRODUTOS
// =====================================================

// listar produtos
app.get('/produtos', async (req, res) => {
    try {
        const [rows] = await pool.execute(
            'SELECT * FROM produtos ORDER BY id DESC'
        );

        res.json(rows);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// cadastrar produto
app.post('/produtos', async (req, res) => {
    try {

        const {
            nome,
            descricao,
            preco,
            estoque,
            categoria
        } = req.body;

        const query = `
            INSERT INTO produtos (
                nome,
                descricao,
                preco,
                estoque,
                categoria
            )
            VALUES (?, ?, ?, ?, ?)
        `;

        const values = [
            nome,
            descricao,
            preco || null,
            estoque || null,
            categoria || null
        ];

        const [result] = await pool.execute(query, values);

        res.status(201).json({
            message: "Produto cadastrado",
            id: result.insertId
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// editar produto
app.put('/produtos/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const {
            nome,
            descricao,
            preco,
            estoque,
            categoria
        } = req.body;

        const query = `
            UPDATE produtos
            SET
                nome=?,
                descricao=?,
                preco=?,
                estoque=?,
                categoria=?
            WHERE id=?
        `;

        const values = [
            nome,
            descricao,
            preco,
            estoque,
            categoria,
            id
        ];

        await pool.execute(query, values);

        res.json({
            message: "Produto atualizado"
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// excluir produto
app.delete('/produtos/:id', async (req, res) => {
    try {
        const { id } = req.params;

        await pool.execute(
            'DELETE FROM produtos WHERE id=?',
            [id]
        );

        res.json({
            message: "Produto removido"
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// ================= INICIAR SERVIDOR =================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});