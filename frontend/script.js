const botao = document.getElementById("btnBuscar");
const listarLivros = document.getElementById("listaLivros");
const mensagem = document.getElementById("mensagem");

const formulario=document.getElementById("formLivro");
const campoTitulo=document.getElementById("titulo");
const campoAutor=document.getElementById("autor");
const campoAno=document.getElementById("ano");

botao.addEventListener("click", buscarLivros);

//formulario.addEventListener("submit", cadastrarLivro){;
formulario.addEventListener("submit", salvarLivro);

let idEdicao=null;

const botaoSalvar=document.getElementById("btnSalvar");

formulario.addEventListener("submit", cadastrarLivro);

async function buscarLivros() {
    try{
        mensagem.textContent = "Buscando livros...";
        const resposta = await fetch("http://localhost:3000/livros");
        if(!resposta.ok) {
            throw new Error("Erro HTTP: " + resposta.status);
        }
        const livros = await resposta.json();
        listarLivros.innerHTML = "";
        if(livros.length === 0) {
            mensagem.textContent = "Nenhum livro cadastrado.";
            return;
        }
        for(let i=0; i<livros.length; i++) {
            listarLivros.innerHTML += `<tr><td>${livros[i].id}</td>
            <td>${livros[i].titulo}</td>
            <td>${livros[i].autor}</td>
            <td>${livros[i].ano}</td>

            <td>
            <button onClick="editarLivro(${livros[i].id})">
            Editar</button>

             <button onClick="excluirLivro(${livros[i].id})">
            Excluir</button>

            </tr>`;
        }
        mensagem.textContent = "Livros encontrados!";

    }catch(erro){
        mensagem.textContent = "Erro ao buscar livros: ";
        console.log("Erro:", erro);

    }
}

async function salvarLivro(evento) {
    evento.preventDefault();
    if(idEdicao===null) {
        await cadastrarLivro(evento);
    } else {
        await atualizarLivro(evento);
    }


//async function cadastrarLivro(evento) {
async function cadastrarLivro() {
    //impede o forms recarregar a página
    //evento.preventDefault();
    try{
        const titulo=campoTitulo.value;
        const autor=campoAutor.value;
        const ano=campoAno.value;

        //objeto para armazenar os dados e organizalos
        const livro={titulo: titulo, autor: autor, ano: ano}
        console.log("Livro enviado:", livro);

        //enviar para API
        const resposta = await fetch("http://localhost:3000/livros", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body:  JSON.stringify(livro) //transformar de js para json
        });
        if(!resposta.ok) {
            throw new Error("Erro HTTP: " + resposta.status);
        }

        const dados=await resposta.json();
        console.log("Resposta da API:", dados);

        formulario.reset();

        await buscarLivros();

        //mostra a mensagem retorada pela API
        mensagem.textContent = dados.mensagem;
    
    }catch(erro){
        mensagem.textContent = 'Não foi possível cadastrar o livro.';
        console.log("Erro ao cadastrar livro:", erro);
    }
}
}

    async function editarLivro (id) {
        try{
            //buscar pelo id o livro que vai ser editado
            const resposta=await fetch("http://localhost:3000/livros/" +id);
            if(!resposta.ok) {
                throw new Error("Erro HTTP: " + resposta.status);
            }

            const livro=await resposta.json();

            campoTitulo.value=livro.titulo;
            campoAutor.value=livro.autor;
            campoAno.value=livro.ano;

            idEdicao=livro.id;
            botaoSalvar.textContent="Atualizar";
            mensagem.textContent = "Editando livro de ID: " + livro.id;
        
        }catch(erro){
            mensagem.textContent = "Erro ao buscar livro para edição: ";
            console.log("Erro ao carregar livro:", erro);
        }
    }

    async function atualizarLivro() {
        try{
            const livro={
                titulo: campoTitulo.value,
                autor: campoAutor.value,
                ano: campoAno.value
            }
            console.log("Livro atualizado:", livro);

            //PUT
            const resposta=await fetch("http://localhost:3000/livros/" + idEdicao, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(livro)
            });
            if(!resposta.ok) {
                throw new Error("Erro HTTP: " + resposta.status);
            }
            const dados=await resposta.json();
            formulario.reset();
            idEdicao=null;
            botaoSalvar.textContent="Cadastrar";
            await buscarLivros();
            mensagem.textContent = dados.mensagem;
        
        }catch(erro){
            mensagem.textContent = "Erro ao atualizar livro: ";
            console.log("Erro ao atualizar livro:", erro);
        }
    }

async function excluirLivro(id) {
    const confirmar = confirm("Tem certeza que deseja excluir este livro: " + id + "?");
    if (!confirmar) {
        return;
    }
    try {
        const resposta = await fetch("http://localhost:3000/livros/" + id, {
            method: "DELETE"
        });
        if(!resposta.ok) {
            throw new Error("Erro HTTP: " + resposta.status);
        }
        const dados = await resposta.json();
        await buscarLivros();
        mensagem.textContent =dados.mensagem;
    } catch(erro) {
        mensagem.textContent = "Erro ao excluir livro: ";
        console.log("Erro ao excluir livro:", erro);
    }
}