//selecionar intens a serem ativos
const carregar = document.querySelector("[data-animacao='caixa']");
const cards = document.querySelectorAll("[data-temperatura='card']")

// ativa um item
function ativarItem(item, classe = "ativo") {
    item.classList.add(classe); 
}

//ativa uma lista de itens
function ativarItens(itens, classe) {
    for (let i = 0; i < itens.length; i++){
        ativarItem(itens[i]);
    }
}


//desativa um item
function desativarItem(item, classe = "ativo") {
    item.classList.remove(classe); 
}

//desativa uma lista de itens
function desativarItens(itens, classe) {
    for (let i = 0; i < itens.length; i++){
        desativarItem(itens[i]);
    }
}

ativarItens(cards);
ativarItem(carregar)
dasativarItem(carregar);
desativarItens(cards);