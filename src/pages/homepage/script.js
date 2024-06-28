import AppBar from "../../shared/components/app-bar.js";
import Button from "../../shared/components/button.js";


AppBar();

// GO TO Products Page
const onOrderNowButtonClick = () => {
  window.location.href = 'src/pages/products/index.html';
}

document.addEventListener('DOMContentLoaded', () => {
  
  const orderNowButton = Button({
    text: 'Pedir agora',
    icon: 'fas fa-shopping-cart',
    onClick: onOrderNowButtonClick
  });
  
  const orderNowButtonContainer = document.querySelector('.content-text');
  orderNowButtonContainer.appendChild(orderNowButton);
});

// // Funcionalidades interativas (exemplo: adicionar ao carrinho)
// const botoesAdicionar = document.querySelectorAll('.marmita button');

// botoesAdicionar.forEach(botao => {
//     botao.addEventListener('click', () => {
//         // Lógica para adicionar a marmita ao carrinho (a implementar)
//         alert('Marmita adicionada ao carrinho!');
//     });
// });

// document.getElementById("searchForm").addEventListener("submit", function(event) {
//     event.preventDefault(); // Evita que o formulário seja enviado
  
//     // Captura o valor do campo de pesquisa
//     var query = document.getElementById("searchInput").value;
  
//     // Aqui você pode adicionar a lógica para manipular a pesquisa
//     // Por exemplo, redirecionar para uma página de resultados
//     if (query.trim() !== "") {
//       window.location.href = "/search-results.html?q=" + encodeURIComponent(query);
//     }
//   });