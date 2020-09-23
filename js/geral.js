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
        "nome": "Boa Vista",
        "temperature": "35 °C",
        "wind": "15 km/h",
        "description": "Partly cloudy",
        "forecast": [
            {
                "day": "1",
                "temperature": "34 °C",
                "wind": "15 km/h"
            },
            {
                "day": "2",
                "temperature": "33 °C",
                "wind": "22 km/h"
            },
            {
                "day": "3",
                "temperature": "33 °C",
                "wind": "13 km/h"
            }
        ]
    }
}
