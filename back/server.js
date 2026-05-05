const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();

app.use(cors());
app.use(express.json());

// Configuração do banco de dados
const dbConfig = {
    host: 'localhost',
    user: 'root', 
    password: '', 
    database: 'exemplos'
};

const pool = mysql.createPool(dbConfig);

pool.getConnection()
    .then(connection => {
        console.log('✅ Conexão com o banco de dados MySQL estabelecida com sucesso!');
        connection.release();
    })
    .catch(error => {
        console.error('❌ Falha ao conectar ao banco de dados MySQL:');
        console.error(error.message);
    });

// ================= ROU_TAS DE PESSOAS =================

app.get('/pessoas', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM pessoas');
        return res.json(rows);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

app.post('/pessoas', async (req, res) => {
    const {
        nome_razao_social, nome_social_fantasia, cep, endereco,
        numero, bairro, cidade, estado, pais, documento, tipo, email
    } = req.body;

    const query = `
        INSERT INTO pessoas (
            nome_razao_social, nome_social_fantasia, cep, endereco,
            numero, bairro, cidade, estado, pais, documento, tipo, email
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        nome_razao_social, nome_social_fantasia || null, cep || null, endereco || null,
        numero || null, bairro || null, cidade || null, estado || null, pais || 'Brasil',
        documento, tipo, email || null
    ];

    try {
        const [result] = await pool.execute(query, values);
        return res.status(201).json({ id: result.insertId });
    } catch (error) {
        console.log("ERRO MYSQL:", error);
        return res.status(500).json({ error: error.message }); // ADICIONADO RETURN AQUI
    }
});

app.put('/pessoas/:id', async (req, res) => {
    const { id } = req.params;
    const { 
        nome_razao_social, nome_social_fantasia, cep, endereco, 
        numero, bairro, cidade, estado, pais, documento, tipo, email 
    } = req.body;

    const query = `
        UPDATE pessoas 
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
        return res.json({ id, ...req.body });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

app.delete('/pessoas/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.execute('DELETE FROM pessoas WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Registro não encontrado' });
        }
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// ================= ROTAS DE PRODUTOS (AGORA NO MYSQL REAL) =================

// LISTAR TODOS OS PRODUTOS DO BANCO
app.get('/produtos', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM produtos');
        return res.json(rows);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// CADASTRAR PRODUTO NO BANCO
app.post('/produtos', async (req, res) => {
    const { nome, descricao, preco, estoque, categoria } = req.body;
    
    if (!nome || !descricao) {
        return res.status(400).json({ error: "Nome e Descrição são obrigatórios para o produto." });
    }

    const query = `
        INSERT INTO produtos (nome, descricao, preco, estoque, categoria) 
        VALUES (?, ?, ?, ?, ?)
    `;
    
    const values = [
        nome,
        descricao,
        preco ? parseFloat(preco) : null,
        estoque ? parseInt(estoque) : null,
        categoria || null
    ];

    try {
        const [result] = await pool.execute(query, values);
        // Retorna o produto com o ID gerado pelo MySQL para o frontend ver
        return res.status(201).json({ id: result.insertId, nome, descricao, preco, estoque, categoria });
    } catch (error) {
        console.error("ERRO MYSQL PRODUTOS:", error);
        return res.status(500).json({ error: error.message });
    }
});

// ATUALIZAR PRODUTO NO BANCO
app.put('/produtos/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, descricao, preco, estoque, categoria } = req.body;

    if (!nome || !descricao) {
        return res.status(400).json({ error: "Nome e Descrição são obrigatórios." });
    }

    const query = `
        UPDATE produtos 
        SET nome = ?, descricao = ?, preco = ?, estoque = ?, categoria = ? 
        WHERE id = ?
    `;
    const values = [
        nome, descricao, 
        preco ? parseFloat(preco) : null, 
        estoque ? parseInt(estoque) : null, 
        categoria || null, 
        id
    ];

    try {
        const [result] = await pool.execute(query, values);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        return res.json({ id, nome, descricao, preco, estoque, categoria });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// EXCLUIR PRODUTO DO BANCO
app.delete('/produtos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.execute('DELETE FROM produtos WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Inicialização
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});