// Selecionar select para controle
const select = document.querySelector("#cidades");

async function carregarOpcoes() {
    // Puxa todos os dados da API
    const req = await fetch('http://localhost:3000/temperaturas/');
    const dados = await req.json();

    // Percorre a lista de dados
    for(dado of dados) {
        // Cria um elemento html option
        const op = document.createElement("option");
        // Define o valor do option sendo o id do dado
        op.setAttribute("value", dado.id);
        // Define o texto que aparece no option
        op.innerText = dado.nome;

        // Adiciona o elemento criado dentro do select
        select.appendChild(op);
    }
}
