<<<<<<< HEAD
const express = require("express");
const app = express();

const cors = require("cors");

const pool = require("./db.js");

=======
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();

>>>>>>> 95fd8cc4e9e1dd7b5f3102196b7303b5a876c508
app.use(cors());
app.use(express.json());


<<<<<<< HEAD



pool.getConnection()
    .then(connection => {
        console.log('✅ Conexão com o banco de dados MySQL estabelecida com sucesso!');
        connection.release(); // Libera a conexão de volta para o pool
    })
    .catch(error => {
        console.error('❌ Falha ao conectar ao banco de dados MySQL:');
        console.error(error.message);
    });

// Rota GET - Listar todos
app.get('/pessoas', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM pessoa');
=======
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

>>>>>>> 95fd8cc4e9e1dd7b5f3102196b7303b5a876c508
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

<<<<<<< HEAD
// Rota GET - Listar todos - PRODUTOS
app.get('/produtos', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM produtos');
        res.json(rows);
=======

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

>>>>>>> 95fd8cc4e9e1dd7b5f3102196b7303b5a876c508
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

<<<<<<< HEAD
// Rota POST - Criar - PESSOAS
app.post('/pessoas', async (req, res) => {
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

// Rota POST - Criar - PRODUTOS
app.post('/produtos', async (req, res) => {
    const { 
        nomeProduto, descricao, preco, estoque, categoria
    } = req.body;

    const query = `
        INSERT INTO produtos 
        (nomeProduto, descricao, preco, estoque, categoria) 
        VALUES (?, ?, ?, ?, ?)
    `;
    
    const values = [
        nomeProduto, 
        descricao, 
        preco, 
        estoque, 
        categoria
    ];

    try {
        const [result] = await pool.execute(query, values);
        res.status(201).json({ id: result.insertId, ...req.body });
=======

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

>>>>>>> 95fd8cc4e9e1dd7b5f3102196b7303b5a876c508
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

<<<<<<< HEAD
// Rota PUT - Atualizar
app.put('/pessoas/:id', async (req, res) => {
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

// Rota PUT - Atualizar - PRODUTOS
app.put('/produtos/:id', async (req, res) => {
    const { id } = req.params;
    const { 
       nomeProduto, descricao, preco, estoque, categoria
    } = req.body;

    const query = `
        UPDATE produtos 
        SET nomeProduto = ?, descricao = ?, preco = ?, estoque = ?, 
            categoria = ?
        WHERE id_produto = ?
    `;
    
    const values = [
        nomeProduto, descricao, preco, estoque, categoria, id
    ];

    try {
        const [result] = await pool.execute(query, values);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Registro de produtos não encontrado' });
        }
        res.json({ id, ...req.body });
=======

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

>>>>>>> 95fd8cc4e9e1dd7b5f3102196b7303b5a876c508
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

<<<<<<< HEAD
// Rota DELETE - Remover
app.delete('/pessoas/:id', async (req, res) => {
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

// Rota DELETE - Remover - PRODUTOS
app.delete('/produtos/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.execute('DELETE FROM produtos WHERE id_produto = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Registro de produto não encontrado' });
        }
        res.status(204).send();
=======

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

>>>>>>> 95fd8cc4e9e1dd7b5f3102196b7303b5a876c508
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

<<<<<<< HEAD
// Inicialização
const PORT = 3000;
=======

// ================= INICIAR SERVIDOR =================

const PORT = process.env.PORT || 3000;

>>>>>>> 95fd8cc4e9e1dd7b5f3102196b7303b5a876c508
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});