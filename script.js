function mudarTema() {
    var corpo = document.body;
    var botao = document.getElementById("botaoTema");
    corpo.classList.toggle("temaClaro");
    if (corpo.classList.contains("temaClaro")) {
        botao.textContent = "Modo Escuro";
        localStorage.setItem("tema", "claro");
    } else {
        botao.textContent = "Modo Claro";
        localStorage.setItem("tema", "escuro");
    }}
window.onload = function() {
    var temaSalvo = localStorage.getItem("tema");
    var corpo = document.body;
    var botao = document.getElementById("botaoTema");
    if (temaSalvo === "claro") {
        corpo.classList.add("temaClaro");
        botao.textContent = "Modo Escuro";
    } else {
        botao.textContent = "Modo Claro";
    }
    ajustarLayout();
};
window.onresize = ajustarLayout;
function ajustarLayout() {
    const largura = window.innerWidth;
    document.querySelectorAll(".menu, .menuhome, .nav-sobre").forEach(menu => {
        if (largura <= 600) {
            menu.style.flexDirection = "column";
            menu.style.alignItems = "center";
        } else {
            menu.style.flexDirection = "";
            menu.style.alignItems = "";
        }});
    document.querySelectorAll(".video video").forEach(video => {
        if (largura <= 600) {
            video.style.width = "100%";
            video.style.height = "auto";
        } else if (largura <= 1024) {
            video.style.width = "45%";
            video.style.height = "auto";
        } else {
            video.style.width = "";
            video.style.height = "";
        }});
    document.querySelectorAll(".produtos").forEach(prod => {
        if (largura <= 600) {
            prod.style.flexDirection = "column";
        } else {
            prod.style.flexDirection = "";
        }
    });
}
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
let editandoIndex = null;

function salvarLocalStorage() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function mostrarFeedback(msg) {
  const feedback = document.getElementById("feedback");
  feedback.textContent = msg;
  setTimeout(() => feedback.textContent = "", 2000);
}

function renderizarLista() {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";
  tarefas.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item}
      <div>
        <button onclick="editarItem(${index})">Editar</button>
        <button onclick="excluirItem(${index})">Excluir</button>
      </div>
    `;
    lista.appendChild(li);
  });
}
let listaItens = [];
let editIndex = -1;

function mostrarFeedback(msg, tempo = 2000) {
  const feedback = document.getElementById('feedbackMsg');
  feedback.textContent = msg;
  setTimeout(() => feedback.textContent = '', tempo);
}

function salvarLocalStorage() {
  localStorage.setItem('lista', JSON.stringify(listaItens));
}

function carregarLocalStorage() {
  const dados = localStorage.getItem('lista');
  if (dados) {
    listaItens = JSON.parse(dados);
    listarItens();
  }
}

function adicionarItem() {
  const input = document.getElementById('itemInput');
  const valor = input.value.trim();

  if (valor === '') {
    mostrarFeedback('Não é permitido adicionar item vazio.');
    return;
  }

  if (listaItens.includes(valor) && editIndex === -1) {
    mostrarFeedback('Item duplicado não permitido.');
    return;
  }

  if (editIndex >= 0) {
    listaItens[editIndex] = valor;
    editIndex = -1;
    mostrarFeedback('Item editado.');
  } else {
    listaItens.push(valor);
    mostrarFeedback('Item adicionado.');
  }

  input.value = '';
  salvarLocalStorage();
  listarItens();
}

function listarItens() {
  const ul = document.getElementById('lista');
  ul.innerHTML = '';

  listaItens.forEach((item, index) => {
    const li = document.createElement('li');

    li.innerHTML = `
      <span>${item}</span>
      <div>
        <button onclick="editarItem(${index})">Editar</button>
        <button onclick="removerItem(${index})">Excluir</button>
      </div>
    `;

    ul.appendChild(li);
  });
}

function removerItem(index) {
  listaItens.splice(index, 1);
  salvarLocalStorage();
  listarItens();
  mostrarFeedback('Item removido.');
}

function editarItem(index) {
  const input = document.getElementById('itemInput');
  input.value = listaItens[index];
  editIndex = index;
}

carregarLocalStorage();
