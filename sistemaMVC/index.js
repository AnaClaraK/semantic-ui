require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Importando os arquivos de rotas
const pessoasRoutes = require('./src/routes/pessoasRoutes.js');
const produtosRoutes = require('./src/routes/produtosRoutes.js');
const clienteRoutes = require('./src/routes/clienteRoutes.js');
const funcionariosRoutes = require('./src/routes/funcionariosRoutes.js');

const app = express();
app.use(cors());
app.use(express.json());

// DEFININDO AS ROTAS PADRONIZADAS (Sem a palavra "Routes" na URL do navegador)
app.use('/pessoas', pessoasRoutes);
app.use('/produtos', produtosRoutes);
app.use('/clientes', clienteRoutes);
app.use('/funcionarios', funcionariosRoutes); // <-- Agora qualquer requisição vai para /funcionarios

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando em http://localhost:${PORT}`));