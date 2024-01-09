const inputTarefa = document.querySelector(".inputTarefa");
const btnTarefa = document.querySelector(".btnTarefa");
const tarefas = document.querySelector(".tarefas");

function criaLi() {
  const li = document.createElement("li");
  return li;
}

function limpaInput() {
  inputTarefa.value = "";
  inputTarefa.focus();
}

function criaTarefa(textoInput) {
  const li = criaLi();
  li.innerText = textoInput;
  tarefas.appendChild(li);
  limpaInput();
  criaBotaoApagar(li);
  salvarTarefas();
}

function criaBotaoApagar(li) {
  li.innerText += " ";
  const criaBotaoApagar = document.createElement("button");
  criaBotaoApagar.innerText = "Delete";
  li.appendChild(criaBotaoApagar);
  criaBotaoApagar.setAttribute("class", "apagar");
  criaBotaoApagar.setAttribute("title", "Apagar essa tarefa");
}

inputTarefa.addEventListener("keypress", function (e) {
  if (e.keyCode === 13) {
    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
  }
});
btnTarefa.addEventListener("click", function () {
  if (!inputTarefa.value) return;
  criaTarefa(inputTarefa.value);
});

document.addEventListener("click", function (e) {
  const el = e.target;

  if (el.classList.contains("apagar")) {
    el.parentElement.remove();
    salvarTarefas();

  }
});

function salvarTarefas() {
  const liTarefas = tarefas.querySelectorAll("li");
  const listaDeTarefas = [];

  for (let tarefa of liTarefas) {
    let tarefaTexto = tarefa.innerText;
    tarefaTexto = tarefaTexto.replace('Apagar','').trim();
    listaDeTarefas.push(tarefaTexto)
  }
  const tarefasJSON = JSON.stringify(listaDeTarefas);
  localStorage.setItem('tarefas', tarefasJSON)
}
function adicionarTarefasSalvas(){
  const tarefas = localStorage.getItem('tarefas');
  const listaDeTarefas = JSON.parse(tarefas)
  for ( let tarefa of listaDeTarefas){
    criaTarefa(tarefa);
  }
}
adicionarTarefasSalvas();