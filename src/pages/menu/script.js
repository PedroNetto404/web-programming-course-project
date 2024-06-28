import Layout from '../../shared/components/layout.js'

const template = `
  <section id="carousel">
        <button class="arrow-left control" aria-label="Previous image"><i class="fa-solid fa-angle-left"></i></button>
        <button class="arrow-right control" aria-label="Next Image"><i class="fa-solid fa-chevron-right"></i></button>
        <div class="gallery-wrapper">
            <div class="gallery">
                <img src="/assets/images/segunda.jpg" alt="Segunda-feira" class="item current-item">
                <img src="/assets/images/terca.jpg" alt="Terça-feira" class="item">
                <img src="/assets/images/quarta.jpg" alt="Quarta-feira" class="item">
                <img src="/assets/images/quinta.jpg" alt="Quinta-feira" class="item">
                <img src="/assets/images/sexta.jpg" alt="Sexta-feira" class="item">
                <img src="/assets/images/sabado.jpg" alt="Sábado" class="item">
            </div>
        </div>
    </section>  
  `;

const $tempDiv = document.createElement('div');
$tempDiv.innerHTML = template.trim();

const $menuPage = $tempDiv.firstChild;

const $layout = Layout({ content: $menuPage });
document.body.append($layout);
// Funcionalidades interativas (exemplo: adicionar ao carrinho)
const botoesAdicionar = document.querySelectorAll('.marmita button');

botoesAdicionar.forEach(botao => {
  botao.addEventListener('click', () => {
    // Lógica para adicionar a marmita ao carrinho (a implementar)
    alert('Marmita adicionada ao carrinho!');
  });
});


// document.getElementById("searchForm").addEventListener("submit", function (event) {
//   event.preventDefault(); // Evita que o formulário seja enviado

//   // Captura o valor do campo de pesquisa
//   var query = document.getElementById("searchInput").value;

//   // Aqui você pode adicionar a lógica para manipular a pesquisa
//   // Por exemplo, redirecionar para uma página de resultados
//   if (query.trim() !== "") {
//     window.location.href = "/search-results.html?q=" + encodeURIComponent(query);
//   }
// });

// const controls = document.querySelectorAll(".control");
// let currentItem = 0;
// const items = document.querySelectorAll(".item");
// const maxItems = items.length;

// controls.forEach((control) => {
//   control.addEventListener("click", () => {
//     const isLeft = control.classList.contains("arrow-left");

//     if (isLeft) {
//       currentItem -= 1;
//     } else {
//       currentItem += 1;
//     }

//     if (currentItem >= maxItems) {
//       currentItem = 0;
//     }

//     if (currentItem < 0) {
//       currentItem = maxItems - 1;
//     }

//     items.forEach((item) => item.classList.remove("current-item"));

//     items[currentItem].scrollIntoView({
//       inline: "center",
//       behavior: "smooth"
//     });

//     items[currentItem].classList.add("current-item");
//   });
// });