const Funcionario = require('../models/funcionariosModel');

const funcionariosController = {
    store: async (req, res) => {
        const { nome, cargo } = req.body;

        // Validação rápida: Nome e Cargo são obrigatórios no salão
        if (!nome || !cargo) {
            return res.status(400).json({ error: "Nome e Cargo são campos obrigatórios." });
        }

        try {
            const insertId = await Funcionario.criar(req.body);
            res.status(201).json({ id_funcionario: insertId, ...req.body });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = funcionariosController;