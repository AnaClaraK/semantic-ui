const Pessoa = require('../models/pessoasModel');

const pessoaController = {
    index: async (req, res) =>{
        try {
            const pessoa = await Pessoa.ListarTodos();
            res.json(pessoa);

        }catch (error) {
            res.status(500).json({error:error.message})
        }
    },
    delete: async(req,res) =>{
        const {id} = req.params;
        try {
            const affectedRows = await Pessoa.deletar(id)
            if (affectedRows === 0){
                return res.status(404).json({mensagem:"registro não encontradi"})

            }
            res.status(204).send()
        } catch (error) {
            res.status(500).json({error:error.message})
        }
    },
}

module.exports = pessoaController;