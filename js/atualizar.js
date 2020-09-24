// Selecionar select para controle
const select = document.querySelector("#cidades");

// Regasta o útlimo valor selecionado
window.addEventListener("load", () => {
    carregarOpcoes(select);
});

const form = document.querySelector("#atualizar");
const btn = form.querySelector("button");

select.addEventListener("change", (e) => {
    if (e.target.value !== "") {
        fetch(`http://localhost:3000/temperaturas/${e.target.value}`)
        .then((r) => r.json())
        .then((json) => {
            form.querySelector("[name='nome']").value = json["nome"];
            form.querySelector("[name='descricao']").value = json["description"];
            form.querySelector("[name='temperatura']").value = json["temperature"].
            replace(/\D/g, "");
            form.querySelector("[name='vento']").value = json["wind"].
            replace(/\D/g, "");


            const prev1 = json["forecast"][0]; // Primeiro item do array
            const prev2 = json["forecast"][1]; // Segundo item do array

            form.querySelector("[name='prev-1-temp']").value = prev1["temperature"].
            replace(/\D/g, "");
            form.querySelector("[name='prev-1-temp']").value = prev1["wind"].
            replace(/\D/g, "");

            form.querySelector("[name='prev-2-temp']").value = prev2["temperature"].
            replace(/\D/g, "");
            form.querySelector("[name='prev-2-temp']").value = prev2["wind"].
            replace(/\D/g, "");
    })
    .catch((erro) => {console.log(erro)});
    } else {

        const inputsTexto = form.querySelectorAll("[type='text']"); // Seleciona os
        inputsTexto.forEach((item) => {item.value = ""});
        
        const inputsNumero = form.querySelectorAll("[type='number']");
        inputsNumero.forEach((item) => {item.value = 0});
    }
});


function atualizarDados(e) {
    e.preventDefault();

    fetch(`http://localhost:3000/temperaturas/${select.value}`, {
        method: "PUT",
        body: gerarJson(form),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    }).catch((erro) => {console.log(erro)});
}

btn.addEventListener("click", atualizarDados);