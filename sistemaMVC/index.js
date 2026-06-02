const express = require("express");
const cors = require("cors");
const pool = require("../sistemaMVC/db");

// Importando as Rotas Separadas
const pessoasRoutes = require("../sistemaMVC/src/routes/pessoasRoutes");
const produtosRoutes = require("../sistemaMVC/src/routes/produtosRoutes");
const funcionariosRoutes = require("../sistemaMVC/src/routes/funcionariosRoutes");
const clienteRoutes = require("../sistemaMVC/src/routes/clienteRoutes");
const app = express();

// Middlewares Globais
app.use(cors());
app.use(express.json());
app.use(express.static('public')); 

// Teste de conexão com o Banco
pool.getConnection()
    .then(connection => {
        console.log('✅ Conexão com o banco de dados MySQL estabelecida com sucesso!');
        connection.release();
    })
    .catch(error => {
        console.error('❌ Falha ao conectar ao banco de dados MySQL:');
        console.error(error.message);
    });

// Definição dos caminhos (Prefixos das rotas)
app.use('/pessoas', pessoasRoutes);
app.use('/produtos', produtosRoutes);
app.use('/funcionarios', funcionariosRoutes);
// Altere de: app.use('/clienteRoutes', clienteRoutes);
// Para isso:
app.use('/', clienteRoutes);



const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
module.exports = app;