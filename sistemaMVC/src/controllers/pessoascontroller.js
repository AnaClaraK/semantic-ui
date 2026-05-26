const pessoaController = {
    index:async (req,res) =>{
        try{
            const pessoas = await Pessoa.listarTodos();
            res.json(pessoa);
        }catch(error){
            res.status(500).json({error: error.message});
        }
    },
    delete: async (req,res) =>{
        const {id} = req.params;
        try{
            const affectedRows = await pessoaController.deletar(id);
            if (affectedRows === 0){
                return res.status(404).json({message: 'Registro não encontrado'});
            }
            res.status(204).send();

        }catch (error) {
            res.status(500).json({error:error.message});
        }

    }
}return res.status(404)