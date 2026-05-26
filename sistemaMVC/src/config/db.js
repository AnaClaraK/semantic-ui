//Meu arquivo de conexão com o banco de dados
const mysql = require('mysql2/promise')
require('dotenv').config();
//pool de conexao
const pool = mysql.createPool({
    //criar as configurações do Banco De Dados
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    port:process.env.DB_PASS,
    database:process.env.DB_NAME,
  
})
//exportando o arquivo db como um módulo
module.exports =  pool