const produtos = require('../models/produtosModel');

const produtosController = {

    index: async (req, res) => {

<<<<<<< HEAD
const pessoaController = {
    // Listar todos
    index: async (req, res) => {
        try {
            const pessoa = await Pessoa.ListarTodos();
            res.json(pessoa);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Salvar novo
    store: async (req, res) => {
        try {
            const insertId = await Pessoa.criar(req.body);
            res.status(201).json({ id: insertId, ...req.body });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Atualizar existente
=======
        try {

            const lista = await produtos.listarTodos();

            res.json(lista);

        } catch (error) {

            res.status(500).json({
                error: error.message
            });

        }
    },

    create: async (req, res) => {

        try {

            const resultado = await produtos.cadastrar(req.body);

            res.status(201).json({
                mensagem: "Produto cadastrado",
                resultado
            });

        } catch (error) {

            res.status(500).json({
                error: error.message
            });

        }
    },

    delete: async (req, res) => {

        const { id } = req.params;

        try {

            const affectedRows = await produtos.deletar(id);

            if (affectedRows === 0) {

                return res.status(404).json({
                    mensagem: "Produto não encontrado"
                });
            }

            res.status(204).send();

        } catch (error) {

            res.status(500).json({
                error: error.message
            });

        }
    },

>>>>>>> 02b810de5fc5fc6958a59de05385f044efeb83f4
    update: async (req, res) => {
        const { id } = req.params;
        try {
            const affectedRows = await Pessoa.atualizar(id, req.body);
            if (affectedRows === 0) {
<<<<<<< HEAD
                return res.status(404).json({ message: 'Registro não encontrado' });
            }
            res.json({ id, ...req.body });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Deletar
    delete: async (req, res) => {
        const { id } = req.params;
        try {
            const affectedRows = await Pessoa.deletar(id);
            if (affectedRows === 0) {
                return res.status(404).json({ message: "Registro não encontrado" });
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};
=======
                return res.status(404).json({ 
                    messagem: 'Registro não encontrado' 
                });
            }
            res.json({ });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        }
}
>>>>>>> 02b810de5fc5fc6958a59de05385f044efeb83f4

module.exports = produtosController;