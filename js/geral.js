// Preenche os selects com as informações da API
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

// Gerar os dados para requisição POST e PUT
function gerarJson(campo) {
    // Estrutura de dados da API
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

    // Retorna os dados no formado adequado
    return JSON.stringify(dados);
}

function validarInput(campo) {
    let isValido = true;

    campo.querySelectorAll("input").forEach((item) => {
        if (!item.value) {
            isValido = false;
        }
    });

    return isValido;
}

document.querySelectorAll("[type='number']").forEach((item) => {
    item.addEventListener("keydown", (e) => {
        if(e.key.toLowerCase() === "e") {
            e.preventDefault();
        }
    });
});
