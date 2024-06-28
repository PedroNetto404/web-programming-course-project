import Layout from "../../shared/components/layout.js";
import Button from "../../shared/components/button.js";

const HomePage = () => {
    const page = `
        <section id="destaque">
            <aside class="content-image">
                <img src="/assets/images/telaInicial.png" alt="Marmita em destaque">
            </aside>
            <div class="content-text">
                <h2 class="styled-font">Saboreie nossas marmitas caseiras!</h2>
                <p class="text">Experimente um sabor inconfundível das nossas marmitas e vire um cliente fiel...</p>
                <br>
            </div>
        </section>
    `;

    const $tempDiv = document.createElement('div');
    $tempDiv.innerHTML = page.trim();
    const $page = $tempDiv.firstChild;

    const orderNowButton = Button({
        text: 'Pedir agora',
        icon: 'fas fa-shopping-cart',
        onClick: () => window.location.href = Pages.products
    });

    $page.querySelector('.content-text').appendChild(orderNowButton);

    return $page;
}

const $page = HomePage();
const $layout = Layout({ content: $page });

document.addEventListener('DOMContentLoaded', () => {
    document.body.appendChild($layout);
});