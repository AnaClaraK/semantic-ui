const express = require("express");
const router = express.Router();
const pool = require("../../db"); // Verifique se este caminho chega até o seu db.js

// URL Real: http://localhost:3000/clienteRoutes/clientes
router.get('/clientes', async (req, res) => {
    try {
        const [rows] = await pool.execute(
            'SELECT id_cliente, nome, telefone FROM clientes'
        );

        res.json(rows);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: error.message
        });
    }
});

// URL Real: http://localhost:3000/clienteRoutes/agendamento
// URL Real: http://localhost:3000/clienteRoutes/agendamento
router.post('/agendamento', async (req, res) => {
    const { nome_cliente, telefone, servico, profissional, profesional, data_agendamento, horario } = req.body;
    
    // Garante que usaremos o termo correto em português para a query
    const profissionalFinal = profissional || profesional;

    try {
        const query = `INSERT INTO agendamentos (nome_cliente, telefone, servico, profissional, data_agendamento, horario) VALUES (?, ?, ?, ?, ?, ?)`;
        const values = [nome_cliente, telefone, servico, profissionalFinal, data_agendamento, horario];
        
        const [result] = await pool.execute(query, values);
        res.status(201).json({ message: "Agendamento realizado com sucesso!", id: result.insertId });
    } catch (error) {
        // ESSA LINHA É CRUCIAL: Mostra no seu terminal do Node o erro exato do MySQL
        console.error("❌ Erro ao inserir no Banco:", error); 

        res.status(500).json({ 
            error: error.message || "Erro interno no banco de dados." 
        });
    }
});
// URL Real: http://localhost:3000/clienteRoutes/inserircliente
// URL Real: http://localhost:3000/clienteRoutes/inserircliente
router.post('/inserircliente', async (req, res) => {
    // Agora aceita o cep vindo do formulário
    const { nome, telefone, cep } = req.body;
    
    // Tratamento para a query não quebrar caso as colunas de histórico venham vazias
    const query = `INSERT INTO clientes (nome, telefone, cep) VALUES (?, ?, ?)`;
    const values = [
        nome, 
        telefone, 
        cep || null, 
    ];

    try {

        console.log("BODY:", req.body);
        console.log("VALUES:", values);
    
        const [result] = await pool.execute(query, values);
    
        res.status(201).json({
            id: result.insertId,
            ...req.body
        });
    
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

module.exports = router;