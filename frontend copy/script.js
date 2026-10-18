const API = "http://localhost:3000/filmes";
const botaoBuscar = document.getElementById("btnBuscar");
const listaFilmes = document.getElementById("listaFilmes");
const mensagem = document.getElementById("mensagem");
const formulario = document.getElementById("formFilme");
const campoTitulo = document.getElementById("titulo");
const campoDiretor = document.getElementById("diretor");
const campoAno = document.getElementById("ano");
const campoGenero = document.getElementById("genero");
const campoValorDiaria = document.getElementById("valorDiaria");
const botaoSalvar = document.getElementById("btnSalvar");
const botaoCancelar = document.getElementById("btnCancelar");
const tituloFormulario = document.getElementById("tituloFormulario");
let idEdicao = null;

botaoBuscar.addEventListener("click", buscarFilmes);
formulario.addEventListener("submit", salvarFilme);
botaoCancelar.addEventListener("click", limparFormulario);

async function buscarFilmes() {
    try {
        mensagem.textContent = "Carregando filmes...";
        const resposta = await fetch(API);
        if (!resposta.ok) throw new Error("Erro HTTP: " + resposta.status);
        const filmes = await resposta.json();
        listaFilmes.innerHTML = "";

        if (filmes.length === 0) {
            mensagem.textContent = "Nenhum filme cadastrado.";
            return;
        }

        filmes.forEach(function (filme) {
            const linha = document.createElement("tr");
            [filme.id, filme.titulo, filme.diretor, filme.ano, filme.genero,
                Number(filme.valor_diaria).toFixed(2).replace(".", ",")].forEach(function (valor) {
                const celula = document.createElement("td");
                celula.textContent = valor;
                linha.appendChild(celula);
            });

            const acoes = document.createElement("td");
            const botaoEditar = document.createElement("button");
            botaoEditar.textContent = "Editar";
            botaoEditar.addEventListener("click", function () { editarFilme(filme.id); });
            const botaoExcluir = document.createElement("button");
            botaoExcluir.textContent = "Excluir";
            botaoExcluir.className = "botao-excluir";
            botaoExcluir.addEventListener("click", function () { excluirFilme(filme.id, filme.titulo); });
            acoes.append(botaoEditar, botaoExcluir);
            linha.appendChild(acoes);
            listaFilmes.appendChild(linha);
        });
        mensagem.textContent = "Filmes carregados com sucesso!";
    } catch (erro) {
        mensagem.textContent = "Não foi possível buscar os filmes. Confira se o servidor e o banco estão funcionando.";
        console.error(erro);
    }
}

async function salvarFilme(evento) {
    evento.preventDefault();
    const filme = {
        titulo: campoTitulo.value.trim(),
        diretor: campoDiretor.value.trim(),
        ano: Number(campoAno.value),
        genero: campoGenero.value.trim(),
        valor_diaria: Number(campoValorDiaria.value)
    };

    try {
        const url = idEdicao === null ? API : API + "/" + idEdicao;
        const metodo = idEdicao === null ? "POST" : "PUT";
        const resposta = await fetch(url, {
            method: metodo,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(filme)
        });
        const dados = await resposta.json();
        if (!resposta.ok) throw new Error(dados.mensagem || "Erro ao salvar filme");
        mensagem.textContent = dados.mensagem;
        limparFormulario();
        await buscarFilmes();
    } catch (erro) {
        mensagem.textContent = erro.message || "Não foi possível salvar o filme.";
        console.error(erro);
    }
}

async function editarFilme(id) {
    try {
        const resposta = await fetch(API + "/" + id);
        const filme = await resposta.json();
        if (!resposta.ok) throw new Error(filme.mensagem || "Filme não encontrado");
        campoTitulo.value = filme.titulo;
        campoDiretor.value = filme.diretor;
        campoAno.value = filme.ano;
        campoGenero.value = filme.genero;
        campoValorDiaria.value = filme.valor_diaria;
        idEdicao = filme.id;
        botaoSalvar.textContent = "Salvar alterações";
        botaoCancelar.hidden = false;
        tituloFormulario.textContent = "Editar filme";
        mensagem.textContent = "Editando filme de ID: " + filme.id;
        formulario.scrollIntoView({ behavior: "smooth" });
    } catch (erro) {
        mensagem.textContent = erro.message || "Não foi possível carregar o filme.";
    }
}

async function excluirFilme(id, titulo) {
    if (!confirm('Deseja realmente excluir o filme "' + titulo + '"?')) return;
    try {
        const resposta = await fetch(API + "/" + id, { method: "DELETE" });
        const dados = await resposta.json();
        if (!resposta.ok) throw new Error(dados.mensagem || "Erro ao excluir filme");
        mensagem.textContent = dados.mensagem;
        if (idEdicao === id) limparFormulario();
        await buscarFilmes();
    } catch (erro) {
        mensagem.textContent = erro.message || "Não foi possível excluir o filme.";
    }
}

function limparFormulario() {
    formulario.reset();
    idEdicao = null;
    botaoSalvar.textContent = "Cadastrar filme";
    botaoCancelar.hidden = true;
    tituloFormulario.textContent = "Cadastrar filme";
}

buscarFilmes();
