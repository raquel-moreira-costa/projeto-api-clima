// Seleciona o formulário
const form = document.querySelector("#adicionar");
// Seleciona o botão
const btn = form.querySelector("button");

function adicionarDado(e) {
    e.preventDefault();

    fetch('http://localhost:3000/temperaturas', {
        method: "POST",
        body: gerarJson(form),
        headers: {"Content-type": "application/json; charset=UTF-8"}
       })
       .catch((erro) => {console.log(erro)});
}

btn.addEventListener("click", adicionarDado);