import mysql from "mysql2/promise";
import "dotenv/config";

const pool=mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10
});

async function testarConexao() {
    const conexao= await pool.getConnection();
    try{
        await conexao.query("SELECT 1");
        console.log("Conexão com o banco de dados bem-sucedida!");
    } catch (erro) {
        console.error("Erro ao testar a conexão com o banco de dados:", erro);
        console.error(`Detalhes do erro: ${erro.message}`);
    } finally {
        if(conexao) {
            conexao.release();
        }
    }
}
export{pool, testarConexao};