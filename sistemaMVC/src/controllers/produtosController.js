const produtosController = {
    index: async (req, res) =>{
        try {
            const pessoa = await Pessoa.listarTodos();
            res.json(pessoa);

        } catch (error) {
            res.status(500).json({error:error.mensagem})
        }
    },
    delete: async(req,res) =>{
        const {id} = req.params;
        try {
            const affectedRows = await produtosController.deleter(id)
            if (affectedRows === 0){
                return res.status(404).json({mensagem:"registro não encontradi"})

            }
            res.status(204).send()
        } catch (error) {
            res.status(500).json({error:error.mensagem})
        }
    },
}