// DADOS
const livrosEncontrados = [
    {
        id: 1,
        titulo: "1984",
        autor: "George Orwell",
        descricao: "Uma distopia sobre vigilância total.",
        imagem: "https://covers.openlibrary.org/b/id/7222246-L.jpg",
        disponivel: true
    },
    {
        id: 2,
        titulo: "Memórias Póstumas",
        autor: "Machado de Assis",
        descricao: "Narrador defunto com ironia.",
        imagem: "https://covers.openlibrary.org/b/id/8231990-L.jpg",
        disponivel: true
    },
    {
        id: 3,
        titulo: "O Hobbit",
        autor: "J.R.R. Tolkien",
        descricao: "Aventura em mundo fantástico.",
        imagem: "https://covers.openlibrary.org/b/id/6979861-L.jpg",
        disponivel: false
    },
    {
        id: 4,
        titulo: "Dom Casmurro",
        autor: "Machado de Assis",
        descricao: "História sobre dúvida e memória.",
        imagem: "https://covers.openlibrary.org/b/id/8231856-L.jpg",
        disponivel: true
    }
];

// ELEMENTOS
const destaqueDiv = document.getElementById("livroDestaque");
const listaDiv = document.getElementById("resultadosBusca");
const inputBusca = document.getElementById("busca");

// CRIAR LIVRO
function criarLivro(livro) {

    const container = document.createElement("div");
    container.classList.add("livro");

    const img = document.createElement("img");
    img.src = livro.imagem;

    const info = document.createElement("div");
    info.classList.add("info");

    const titulo = document.createElement("h4");
    titulo.textContent = livro.titulo;

    const autor = document.createElement("p");
    autor.textContent = livro.autor;

    const status = document.createElement("p");
    const botao = document.createElement("button");

    // STATUS
    if (livro.disponivel) {
        status.textContent = "Disponível";
        status.classList.add("disponivel");

        botao.textContent = "Reservar";
    } else {
        status.textContent = "Indisponível";
        status.classList.add("indisponivel");

        botao.textContent = "Indisponível";
        botao.disabled = true;
    }

    // CLIQUE
    botao.addEventListener("click", () => {
        botao.textContent = "Reservado!";
        botao.disabled = true;
        botao.classList.add("desativado");

        status.textContent = "Indisponível";
        status.classList.remove("disponivel");
        status.classList.add("indisponivel");

        console.log("Livro reservado:", livro.titulo);
    });

    info.appendChild(titulo);
    info.appendChild(autor);
    info.appendChild(status);
    info.appendChild(botao);

    container.appendChild(img);
    container.appendChild(info);

    return container;
}

// DESTAQUE
function exibirDestaque(livro) {
    destaqueDiv.innerHTML = "";

    const container = criarLivro(livro);

    const descricao = document.createElement("p");
    descricao.textContent = livro.descricao;
    descricao.classList.add("descricao");

    container.querySelector(".info").appendChild(descricao);

    destaqueDiv.appendChild(container);
}

// LISTA
function exibirLista(livros) {
    listaDiv.innerHTML = "";
    livros.forEach(livro => {
        listaDiv.appendChild(criarLivro(livro));
    });
}

// BUSCA
inputBusca.addEventListener("input", () => {
    const valor = inputBusca.value.toLowerCase();

    const filtrados = livrosEncontrados.filter(livro =>
        livro.titulo.toLowerCase().includes(valor)
    );

    if (filtrados.length > 0) {
        exibirDestaque(filtrados[0]);
        exibirLista(filtrados.slice(1));
    } else {
        destaqueDiv.innerHTML = "<p>Nenhum livro encontrado</p>";
        listaDiv.innerHTML = "";
    }
});

// INIT
exibirDestaque(livrosEncontrados[0]);
exibirLista(livrosEncontrados.slice(1));