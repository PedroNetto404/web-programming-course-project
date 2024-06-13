// Funcionalidades interativas (exemplo: adicionar ao carrinho)
const botoesAdicionar = document.querySelectorAll('.marmita button');

botoesAdicionar.forEach(botao => {
    botao.addEventListener('click', () => {
        // Lógica para adicionar a marmita ao carrinho (a implementar)
        alert('Marmita adicionada ao carrinho!');
    });
});
