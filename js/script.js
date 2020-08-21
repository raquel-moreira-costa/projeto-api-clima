//selecionar intens a serem ativos
const carregar = document.querySelector("[data-animacao='caixa']");
const cards = document.querySelectorAll("[data-temperatura='card']");
const erro = document.querySelector("[data-temperatura='erro']");
const titulo = document.querySelector("header h1");
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

function formatarData(acrescimo = 0){
    //Define a data atual e dos dias seguintes
    const data = new Date();
    data.setDate(data.getDate() + Number(acrescimo));
    
    //Pega o dia e o mês
    const dia = data.getDate();
    const mes = data.getMonth() + 1;
    
    //Retorna a data formatada
    return `${(dia < 10)? "0" + dia : dia}/${(mes < 10)? "0" + mes : mes}`;
    
}

function preencherDados(elementos,dados){
    //Organiza os dados
    const {temperature: temp, wind: vento, description: descri, forecast: previsao} = dados;
    
    for (let i = 0; i < elementos.length; i++) {
        //Seleciona os dados dentro do card
        const cardData = elementos[i].querySelector("[data-temperatura='data']");
        const cardTemp =elementos[i].querySelector("[data-temperatura='temp']");
        const cardVento =elementos[i].querySelector("[data-temperatura='vento']");
        const cardDescri =elementos[i].querySelector("[data-temperatura='descri']");
        
        if (elementos[i].dataset.prev) {
            
            //Card de privisões futuras
            const indice =elementos[i].dataset.prev;
            const {temperature: temp, wind: vento, day: dia} = previsao[indice];
            
            //Preenchendo os campos
            cardData.innerText = formatarData(dia);
            cardTemp.innerText = temp;
            cardVento.innerText = vento;
            
        }else
        {
            //Card da previsão de hoje
            //Prenchendo os campos
            cardData.innerText = formatarData();
            cardTemp.innerText = temp;
            cardVento.innerText = vento;
            cardDescri.innerText = descri;
        }
        
    }
    
}
// Busca os dados na API
function buscarDados(evento) {
    const current = evento.currentTarget;
    const cidade = current.value;
    
    // Inicia a animação de busca e limpa e os dados
    desativarItem(erro);
    desativarItens(cards);
    ativarItem(carregar);
    
    // Faz a requisição
    const requisicao = fetch(`https://goweather.herokuapp.com/weather/${cidade}`);
    requisicao.then( (resposta) => resposta.json())
    .then((json) => {
        // Retorno da requisição
        titulo.innerText = current.querySelector(`option[value="${cidade}"]`).innerText;
        preencherDados(cards, json)
        trocarFundo(json["temperature"]);
        
        ativarItens(cards);
    })
    .catch((e) => {
        // Erros na busca
        titulo.innerText = "Clima-Capital";
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
