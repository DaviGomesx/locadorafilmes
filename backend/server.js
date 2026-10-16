import express from "express";

import "dotenv/config";
import livrosRoutes from "./routes/livrosRoutes.js";
import corsMiddleware from "./middlewares/corsMiddlewares.js";
import {testarConexao} from "./database/conexao.js";


//CRIANDO A APLICAÇÃO
const app = express();
const PORT = process.env.PORT || 3000;

//MIDDLEWARES
app.use(corsMiddleware);
app.use(express.json());

//ROTAS
app.use("/livros", livrosRoutes);

//ROTA INICIAL
app.get("/", function (req, res) {
    res.status(200).json({ mensagem: "Bem-vindo à API da Biblioteca Dom!" });
});

async function iniciarServidor() {
    try {
        await testarConexao();
        app.listen(PORT, function () {
            console.log("Servidor rodando em http://localhost:" + PORT);
        });
    } catch (erro) {
        console.log("Não foi possível inciar o servidor");
        console.log(erro.message);
    }
}

iniciarServidor();