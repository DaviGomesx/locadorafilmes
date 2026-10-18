import { pool } from "../database/conexao.js";

async function listarLivros(req, res) {
    try {
        const [filmes] = await pool.query("SELECT * FROM filmes ORDER BY id");
        res.status(200).json(filmes);
    } catch (erro) {
        console.error("Erro ao listar filmes:", erro);
        res.status(500).json({ mensagem: "Erro ao listar filmes" });
    }
}

async function buscarLivroPorId(req, res) {
    try {
        const [filmes] = await pool.query("SELECT * FROM filmes WHERE id = ?", [req.params.id]);
        if (filmes.length === 0) return res.status(404).json({ mensagem: "Filme não encontrado" });
        res.status(200).json(filmes[0]);
    } catch (erro) {
        console.error("Erro ao buscar filme:", erro);
        res.status(500).json({ mensagem: "Erro ao buscar filme" });
    }
}

async function cadastrarLivro(req, res) {
    const { titulo, diretor, ano, genero, valor_diaria } = req.body;
    if (!titulo || !diretor || !ano || !genero || valor_diaria === undefined || Number(valor_diaria) <= 0) {
        return res.status(400).json({ mensagem: "Preencha todos os campos corretamente" });
    }
    try {
        const [resultado] = await pool.query(
            "INSERT INTO filmes (titulo, diretor, ano, genero, valor_diaria) VALUES (?, ?, ?, ?, ?)",
            [titulo, diretor, ano, genero, valor_diaria]
        );
        res.status(201).json({ mensagem: "Filme cadastrado com sucesso!", id: resultado.insertId });
    } catch (erro) {
        console.error("Erro ao cadastrar filme:", erro);
        res.status(500).json({ mensagem: "Erro ao cadastrar filme" });
    }
}

async function atualizarLivro(req, res) {
    const { titulo, diretor, ano, genero, valor_diaria } = req.body;
    if (!titulo || !diretor || !ano || !genero || valor_diaria === undefined || Number(valor_diaria) <= 0) {
        return res.status(400).json({ mensagem: "Preencha todos os campos corretamente" });
    }
    try {
        const [resultado] = await pool.query(
            "UPDATE filmes SET titulo = ?, diretor = ?, ano = ?, genero = ?, valor_diaria = ? WHERE id = ?",
            [titulo, diretor, ano, genero, valor_diaria, req.params.id]
        );
        if (resultado.affectedRows === 0) return res.status(404).json({ mensagem: "Filme não encontrado" });
        res.status(200).json({ mensagem: "Filme atualizado com sucesso!" });
    } catch (erro) {
        console.error("Erro ao atualizar filme:", erro);
        res.status(500).json({ mensagem: "Erro ao atualizar filme" });
    }
}

async function excluirLivro(req, res) {
    try {
        const [resultado] = await pool.query("DELETE FROM filmes WHERE id = ?", [req.params.id]);
        if (resultado.affectedRows === 0) return res.status(404).json({ mensagem: "Filme não encontrado" });
        res.status(200).json({ mensagem: "Filme excluído com sucesso!" });
    } catch (erro) {
        console.error("Erro ao excluir filme:", erro);
        res.status(500).json({ mensagem: "Erro ao excluir filme" });
    }
}

export { listarLivros, cadastrarLivro, atualizarLivro, buscarLivroPorId, excluirLivro };
