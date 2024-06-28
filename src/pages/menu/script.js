import AppBar from "../../shared/components/app-bar.js";
import Footer from "../../shared/components/footer.js";
AppBar();
Footer(); 
// Funcionalidades interativas (exemplo: adicionar ao carrinho)
const botoesAdicionar = document.querySelectorAll('.marmita button');

botoesAdicionar.forEach(botao => {
    botao.addEventListener('click', () => {
        // Lógica para adicionar a marmita ao carrinho (a implementar)
        alert('Marmita adicionada ao carrinho!');
    });
});


document.getElementById("searchForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita que o formulário seja enviado
  
    // Captura o valor do campo de pesquisa
    var query = document.getElementById("searchInput").value;
  
    // Aqui você pode adicionar a lógica para manipular a pesquisa
    // Por exemplo, redirecionar para uma página de resultados
    if (query.trim() !== "") {
      window.location.href = "/search-results.html?q=" + encodeURIComponent(query);
    }
  });

const controls = document.querySelectorAll(".control");
let currentItem = 0;
const items = document.querySelectorAll(".item");
const maxItems = items.length;

controls.forEach((control) => {
  control.addEventListener("click", () => {
    const isLeft = control.classList.contains("arrow-left");

    if (isLeft) {
      currentItem -= 1;
    } else {
      currentItem += 1;
    }

    if (currentItem >= maxItems) {
      currentItem = 0;
    }

    if (currentItem < 0) {
      currentItem = maxItems - 1;
    }

    items.forEach((item) => item.classList.remove("current-item"));

    items[currentItem].scrollIntoView({
      inline: "center",
      behavior: "smooth"
    });

    items[currentItem].classList.add("current-item");
  });
});