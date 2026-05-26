const express = require("express");
const app = express();

const cors = require("cors");

const pool = require("./db.js");

app.use(cors());
app.use(express.json());

<<<<<<< HEAD
app.use(express.static('public'));



=======
>>>>>>> 02b810de5fc5fc6958a59de05385f044efeb83f4
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
app.get('/pessoa', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM pessoas');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota GET - Listar todos - PRODUTOS
app.get('/produtos', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM produtos');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota POST - Criar - pessoa
app.post('/pessoa', async (req, res) => {
    const { 
        nome_razao_social, nome_social_fantasia, cep, endereco, 
        numero, bairro, cidade, estado, pais, documento, tipo, email 
    } = req.body;

    const query = `
        INSERT INTO pessoas
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
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota PUT - Atualizar
app.put('/pessoa/:id', async (req, res) => {
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
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota DELETE - Remover
app.delete('/pessoa/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.execute('DELETE FROM pessoas WHERE id = ?', [id]);

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
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
<<<<<<< HEAD
app.post('/funcionarios', async (req, res) => {
    const { 
        nome, cargo, telefone, especialidade, comissao_percentual, data_admissao 
    } = req.body;

    // Validação simples obrigando pelo menos o nome e o cargo
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
        cargo, // Ex: 'Cabeleireiro', 'Assistente'
        telefone || null, 
        especialidade || 'Geral', // Ex: 'Colorimetria', 'Cortes', 'Escovas'
        comissao_percentual || 0.00, // Ex: 40.00 para 40%
        data_admissao || new Date().toISOString().slice(0, 10) // Pega a data de hoje se não enviar
    ];

    try {
        const [result] = await pool.execute(query, values);
        res.status(201).json({ id_funcionario: result.insertId, ...req.body });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/funcionarios', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM funcionarios');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Inicialização
=======
//agendamento
console.log("ROTA AGENDAMENTO CARREGADA");
app.post('/agendamento', async (req, res) => {
    const {
        nome_cliente,
        telefone,
        servico,
        profissional,
        data_agendamento,
        horario
    } = req.body;
    try {
        const query = `
            INSERT INTO agendamentos
            (
                nome_cliente,
                telefone,
                servico,
                profissional,
                data_agendamento,
                horario
            )
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const values = [
            nome_cliente,
            telefone,
            servico,
            profissional,
            data_agendamento,
            horario
        ];
        const [result] = await pool.execute(query, values);
        res.status(201).json({
            message: "Agendamento realizado com sucesso!",
            id: result.insertId
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            erro: error.message
        });
    }
});
// APP.LISTEN TEM QUE SER O ÚLTIMO
>>>>>>> 02b810de5fc5fc6958a59de05385f044efeb83f4
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});