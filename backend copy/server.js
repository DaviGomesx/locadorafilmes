import express from "express";
import "dotenv/config";
import livrosRoutes from "./routes/livrosRoutes.js";
import corsMiddleware from "./middlewares/corsMiddlewares.js";
import { testarConexao } from "./database/conexao.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(corsMiddleware);
app.use(express.json());
app.use("/filmes", livrosRoutes);

app.get("/", function (req, res) {
    res.status(200).json({ mensagem: "Bem-vindo à API da Locadora de Filmes!" });
});

async function iniciarServidor() {
    try {
        await testarConexao();
        app.listen(PORT, function () {
            console.log("Servidor rodando em http://localhost:" + PORT);
        });
    } catch (erro) {
        console.log("Não foi possível iniciar o servidor. Confira a conexão com o banco de dados.");
        console.log(erro.message);
    }
}

iniciarServidor();
