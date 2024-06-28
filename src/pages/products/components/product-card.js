import Button from "../../../shared/components/button.js";
import constants from "../../../shared/constants.js";
const { Colors } = constants;

const cardStyle = {
    'border': `1px solid ${Colors.primary}`,
    'border-radius': '8px',
    'padding': '16px',
    'margin': '8px',
    'text-align': 'center',
    'box-shadow': '0 4px 8px rgba(0, 0, 0, 0.1)',
    'background-color': Colors.background,
    'color': Colors.foreground,
    'transition': 'transform 0.2s',
    'width': '200px',  // Definindo uma largura fixa para todos os cards
    'height': '350px', // Definindo uma altura fixa para todos os cards
    'display': 'flex',
    'flex-direction': 'column',
    'justify-content': 'space-between'
};

const imgStyle = {
    'width': '100%',
    'height': '150px', // Definindo uma altura fixa para a imagem
    'border-radius': '8px 8px 0 0',
    'object-fit': 'cover'
};

const ProductCard = ({
    product,
    onTap
}) => {
    const { name, description, price, picture } = product;
    const placeholderImage = "/path/to/placeholder.png"; // Defina o caminho para uma imagem padrão

    const template = `
        <div class="product-card" style="${Object.keys(cardStyle).map(key => `${key}: ${cardStyle[key]};`).join('')}">
            <img src="${picture || placeholderImage}" alt="${name}" style="${Object.keys(imgStyle).map(key => `${key}: ${imgStyle[key]};`).join('')}">
            <div>
                <h3>${name}</h3>
                <p>${description}</p>
                <p><strong>R$ ${price.toFixed(2)}</strong></p>
            </div>
            <div class="button-container"></div>
        </div>
    `;

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = template.trim();
    const cardElement = tempDiv.firstChild;

    const button = Button({
        text: 'Adicionar ao Carrinho',
        style: { 
            'background-color': Colors.highlight,
            'width': '100%',
            'margin-top': '8px'
        },
        onClick: onTap
    });

    cardElement.querySelector('.button-container').appendChild(button);

    return cardElement;
};

export default ProductCard;
