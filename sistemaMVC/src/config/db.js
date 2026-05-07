require('dotenv').config();

const mysql = require('mysql2/promise')

const conexao = mysql.createPool({//(o nome)conexao tem q ser o msm la em baixo
    //criar as configurações do DB
    //host é o endereço do DB
    host: "",
    user:"",
    password:"",
    port:3306,
    database:"",
    waitForConnections:true,
    connectionLimit:10,
    queueLimit:0

})
// 
module.exports = conexao//desse aq