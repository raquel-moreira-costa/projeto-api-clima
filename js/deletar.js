// Selecionar select para controle
const select = document.querySelector("#cidades");

// Regasta o útlimo valor selecionado
window.addEventListener("load", () => {
    carregarOpcoes(select);
});

// Seleciona o botão
const btn = document.querySelector("#deletar button");

btn.addEventListener("click", (e) => {
    e.preventDefault();

    // Pegando o valor do select
    const valor = select.value;

    // Valida se algum valor foi selecionado
    if (valor !== "") {
        // Faz a requisição com o verbo delete
        fetch(`http://localhost:3000/temperaturas/${valor}`, {method: "DELETE"})
        .catch((erro) => {console.log(erro)});
    }
});
