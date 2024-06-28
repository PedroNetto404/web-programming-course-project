import Layout from "../../shared/components/layout.js";

const ContactPage = () => {
    const template = `
        <section id="destaque">
            <aside class="content-image">
                <img src="/assets/images/motoboy.png" alt="Marmita em destaque">
            </aside>
            <div class="content-text">
                <h2 class="styled-font">Faça seu pedido:  </h2>
                <h2 class="styled-font">(16) 3040 - 2179  </h2>
                <p class="text">Endereço para retirada ou almoço no local:</p>
                <br>
                <p class="text">Rua Enzo Morandi, nº 260</p>
            </div>
        </section>
    `;

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = template.trim();
    const page = tempDiv.firstChild;

    return page;
}

const $page = ContactPage();
const $layout = Layout({ content: $page });

document.addEventListener('DOMContentLoaded', () => {
    document.body.appendChild($layout);
});
