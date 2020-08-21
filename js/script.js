//selecionar intens a serem ativos
const carregar = document.querySelector("[data-animacao='caixa']");
const cards = document.querySelectorAll("[data-temperatura='card']");
const erro = document.querySelector("[data-temperatura='erro']");
//Selecionar select para controle
const select = document.querySelector("#cidades")

const body = document.body;

// ativa um item
function ativarItem(item, classe = "ativo") {
    item.classList.add(classe); 
}

//ativa uma lista de itens
function ativarItens(itens, classe) {
    for (let i = 0; i < itens.length; i++){
        ativarItem(itens[i], classe);
    }
}


//desativa um item
function desativarItem(item, classe = "ativo") {
    item.classList.remove(classe); 
}

//desativa uma lista de itens
function desativarItens(itens, classe) {
    for (let i = 0; i < itens.length; i++){
        desativarItem(itens[i], classe);
    }
}

    function trocarFundo(temp) {    
        
       const valor = Number(temp.replace(/\D/g,""));

          if (valor) { 
           const classe = (valor <= 20) ? "frio" : "quente";
           body.className = "";

           ativarItem(body, classe );
         }
    }
// Busca os dados na API
function buscarDados(evento) {
    const cidade = evento.currentTarget.value;

    // Inicia a animação de busca e limpa e os dados
    desativarItem(erro);
    desativarItens(cards);
    ativarItem(carregar);

    // Faz a requisição
    const requisicao = fetch(`https://goweather.herokuapp.com/weather/${cidade}`);
    requisicao.then( (resposta) => resposta.json())
    .then((json) => {
        // Retorno da requisição

        trocarFundo(json["temperature"]);

        ativarItens(cards);
    })
    .catch((e) => {
        // Erros na busca
        body.className = "";
        ativarItem(erro);
    })
    .finally((r) => {
        // Encerramento da busca
        desativarItem(carregar);
    });
}

// Adicionar o evento para manipular dados
select.addEventListener("change", buscarDados);
