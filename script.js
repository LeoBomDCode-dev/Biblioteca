// DADOS
const livrosEncontrados = [
    {
        id: 1,
        titulo: "1984",
        autor: "George Orwell",
        genero: "Distopia",
        editora: "Companhia das Letras",
        avaliacao: 4.8,
        descricao: "Uma distopia sobre vigilância total, controle do governo e manipulação da verdade.",
        imagem: "https://covers.openlibrary.org/b/id/7222246-L.jpg",
        disponivel: true
    },
    {
        id: 2,
        titulo: "Memórias Póstumas",
        autor: "Machado de Assis",
        genero: "Romance",
        editora: "Globo Livros",
        avaliacao: 4.7,
        descricao: "Um narrador defunto conta sua vida com ironia e crítica à sociedade.",
        imagem: "https://covers.openlibrary.org/b/id/8231990-L.jpg",
        disponivel: true
    },
    {
        id: 3,
        titulo: "O Hobbit",
        autor: "J.R.R. Tolkien",
        genero: "Fantasia",
        editora: "HarperCollins",
        avaliacao: 4.9,
        descricao: "Uma jornada épica de aventura, coragem e descobertas em um mundo fantástico.",
        imagem: "https://covers.openlibrary.org/b/id/6979861-L.jpg",
        disponivel: false
    },
    {
        id: 4,
        titulo: "Dom Casmurro",
        autor: "Machado de Assis",
        genero: "Romance Psicológico",
        editora: "Ática",
        avaliacao: 4.6,
        descricao: "Uma narrativa envolvente sobre memória, ciúme e dúvida.",
        imagem: "https://covers.openlibrary.org/b/id/8231856-L.jpg",
        disponivel: true
    }
];

// DOM
const destaqueDiv = document.getElementById("livroDestaque");
const listaDiv = document.getElementById("resultadosBusca");
const inputBusca = document.getElementById("busca");
 
// FUNÇÃO PARA NORMALIZAR TEXTO (remove acentos)
function normalizar(texto) {
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}
 
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
    autor.textContent = "Autor: " + livro.autor;
 
    const avaliacao = document.createElement("p");
    avaliacao.textContent = "⭐ " + livro.avaliacao;
 
    const status = document.createElement("p");
 
    if (livro.disponivel) {
        status.textContent = "Disponível";
        status.classList.add("disponivel");
    } else {
        status.textContent = "Indisponível";
        status.classList.add("indisponivel");
    }
 
    const botao = document.createElement("button");
 
    if (!livro.disponivel) {
        botao.textContent = "Indisponível";
        botao.disabled = true;
    } else {
        botao.textContent = "Reservar";
    }
 
    let reservado = false;
 
    botao.addEventListener("click", () => {
        reservado = !reservado;
 
        if (reservado) {
            botao.textContent = "Reservado!";
            botao.classList.add("reservado");
        } else {
            botao.textContent = "Reservar";
            botao.classList.remove("reservado");
        }
    });
 
    info.appendChild(titulo);
    info.appendChild(autor);
    info.appendChild(avaliacao);
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
    container.classList.add("destaque-card");
 
    const detalhes = document.createElement("div");
    detalhes.classList.add("detalhes");
 
    detalhes.innerHTML = `
<p class="descricao">${livro.descricao}</p>
<p><strong>Gênero:</strong> ${livro.genero}</p>
<p><strong>Editora:</strong> ${livro.editora}</p>
    `;
 
    container.querySelector(".info").appendChild(detalhes);
 
    destaqueDiv.appendChild(container);
}
 
// LISTA
function exibirLista(livros) {
    listaDiv.innerHTML = "";
    livros.forEach(livro => {
        listaDiv.appendChild(criarLivro(livro));
    });
}
 
// ATUALIZAR
function atualizarTela() {
    exibirDestaque(livrosEncontrados[0]);
    exibirLista(livrosEncontrados.slice(1));
}
 
// BUSCA
inputBusca.addEventListener("input", () => {
    const valor = normalizar(inputBusca.value.trim());
 
    if (valor === "") {
        atualizarTela();
        return;
    }
 
    const filtrados = livrosEncontrados.filter(livro =>
        normalizar(livro.titulo).includes(valor) ||
        normalizar(livro.autor).includes(valor)
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
atualizarTela();
 