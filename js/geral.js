async function carregarOpcoes(campo) {
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
        
        // Adiciona o elemento criado dentro do campo select
        campo.appendChild(op);
    }
}

// Arquivo geral.js
// Aqui a gente vai criar uma função que vai pegar os valores dos campos e converter pra json, ok?

function gerarJson(campo) {

    const dados = {
        "nome": campo.querySelector("[name = 'nome']").value,
        "temperature": `${campo.querySelector("[name='temperatura']").value}°C`,
        "wind": `${campo.querySelector("[name='vento']").value} km/h`,
        "description": campo.querySelector("[name='descricao']").value,
        "forecast": [
            {
                "day": "1",
                "temperature": `${campo.querySelector("[name='prev-1-temp']").value}°C`,
                "wind": `${campo.querySelector("[name='prev-1-vento']").value} km/h`,
            },
            {
                "day": "2",
                "temperature": `${campo.querySelector("[name='prev-2-temp']").value}°C`,
                "wind": `${campo.querySelector("[name='prev-2-vento']").value} km/h`,
            },
        ]
    }
    return JSON.stringify(dados);
}
