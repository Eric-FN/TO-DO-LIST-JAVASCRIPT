const inputTarefa = document.querySelector(".input-tarefa");
const btnTarefa = document.querySelector(".btn-tarefa");
const tarefas = document.querySelector(".tarefas");

//esta função cria apenas o elemento "li"
function criaLi() {
  const li = document.createElement("li");
  return li;
}

//Esta função pega o evento do "enter" que possui o keycode === 13 e aciona o criaTarefa(inputTarefa.value)
inputTarefa.addEventListener("keypress", function (e) {
  if (e.keyCode === 13) {
    if (!inputTarefa.value) return; //para não enviar coisas vazias
    criaTarefa(inputTarefa.value);
  }
});

//Esta função limpa o input ao ser enviado para não ficar com o que foi escrito ali (formulario tem essa função por defeito quando o formulario é enviado se eu não me engano)
function limpaInput() {
  inputTarefa.value = "";
  inputTarefa.focus();
}

//nesta função é criado o botao apagar
function criaBotaoApagar(li) {
  li.innerText += " "; //esta linha de codigo coloca o espaço para o botao nao ficar colado
  const botaoApagar = document.createElement("button"); //cria o elemento "button"
  botaoApagar.innerText = "Apagar"; //insere o texto "Apagar"
  botaoApagar.setAttribute("class", "apagar"); //Cria a class = 'apagar'
  botaoApagar.setAttribute("title", "apagar esta tarefa"); // coloca o texto que aparece quando passam o mouse em cima
  li.appendChild(botaoApagar); // Cria o botao como um filho do "li"
}

//Nesta função é criada a tarefa
function criaTarefa(textoInput) {
  const li = criaLi(); //chama a função "criaLi()" como uma constante para ser usada
  li.innerText = textoInput; //pega os dados do texto inserido no Input
  tarefas.appendChild(li); // Adiciona a tafera como filho de "li"
  limpaInput(); //chama o limpaInput() para ser executado quando a tarefa for criada
  criaBotaoApagar(li);
  salvarTarefa();
}

//esta função "click" chama a função 'criarTarefa(inputTarefa.value);' e seta o paramentro "textoInput" como a variavel setada "inputTarefa.value"
btnTarefa.addEventListener("click", function () {
  if (!inputTarefa.value) return; //para não enviar coisas vazias
  criaTarefa(inputTarefa.value);
});

document.addEventListener("click", function (e) {
  const el = e.target;
  if (el.classList.contains("apagar")) {
    el.parentElement.remove(); //apaga o pai do elemento 'BUTTON'
    salvarTarefa();
  }
});
function salvarTarefa() {
  const liTarefas = tarefas.querySelectorAll("li");
  const listaDeTarefas = [];

  for (let tarefa of liTarefas) {
    let tarefaTexto = tarefa.innerText;
    tarefaTexto = tarefaTexto.replace("Apagar", "").trim();
    listaDeTarefas.push(tarefaTexto);
  }
  const tarefasJSON = JSON.stringify(listaDeTarefas); //converte a o elemento javascript em String no formato json
  localStorage.setItem("tarefas", tarefasJSON); //Salva as tarefas no localStorage do navegador
}

function adicionaTarefasSalvas() {
  const tarefas = localStorage.getItem("tarefas"); //salva as tarefas no localStorage do navegador
  const listaDeTarefas = JSON.parse(tarefas); //converte em array novamente ou objeto em javascript

  for (let tarefa of listaDeTarefas) {
    criaTarefa(tarefa);
  }
}
adicionaTarefasSalvas();
