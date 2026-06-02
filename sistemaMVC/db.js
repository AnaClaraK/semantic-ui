const mysql = require('mysql2/promise');
require('dotenv').config();

// Pool de conexão configurado dinamicamente pelo .env
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'exemplos',
    port: Number(process.env.DB_PORT) || 3306, // Convertido para número, pois portas são inteiros
    
    // Configurações de estabilidade do Pool
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Exportando o pool de conexão como um módulo
module.exports = pool;