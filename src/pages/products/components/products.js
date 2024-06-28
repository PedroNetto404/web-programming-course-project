import ProductCard from './product-card.js';
import Button from '../../../shared/components/button.js';

const categories = {
    'local-meal': {
        icon: 'fas fa-utensils',
        label: 'Refeições'
    },
    'lunchbox': {
        icon: 'fa fa-box',
        label: 'Marmitas'
    },
    'drink': {
        icon: 'fas fa-glass-martini',
        label: 'Bebidas'
    }
};

const containerStyle = {
    'display': 'flex',
    'flex-direction': 'column',
    'align-items': 'center',
    'gap': '20px',
    'width': '100%'
};

const buttonContainerStyle = {
    'display': 'flex',
    'justify-content': 'flex-end',
    'gap': '10px',
    'width': '100%'
};

const productCarouselStyle = {
    'display': 'flex',
    'overflow-x': 'auto',
    'width': '100%',
    'gap': '10px'
};

const Products = ({ products, onClick }) => {
    let currentCategory = null;

    const filterProducts = (category) => {
        currentCategory = category;
        renderProducts();
    };

    const template = `
        <div class="products-container" style="${Object.keys(containerStyle).map(key => `${key}: ${containerStyle[key]};`).join('')}">
            <div class="button-container" style="${Object.keys(buttonContainerStyle).map(key => `${key}: ${buttonContainerStyle[key]};`).join('')}"></div>
            <div class="product-carousel" style="${Object.keys(productCarouselStyle).map(key => `${key}: ${productCarouselStyle[key]};`).join('')}"></div>
        </div>
    `;

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = template.trim();
    const productsContainer = tempDiv.firstChild;

    const buttonContainer = productsContainer.querySelector('.button-container');
    const productCarousel = productsContainer.querySelector('.product-carousel');

    Object.keys(categories).forEach(category => {
        const button = Button({
            icon: categories[category].icon,
            text: categories[category].label,
            style: { 'background-color': 'var(--highlight-color)', 'padding': '10px' },
            onClick: () => filterProducts(category)
        });
        buttonContainer.appendChild(button);
    });

    const renderProducts = () => {
        productCarousel.innerHTML = '';
        const filteredProducts = currentCategory ? products.filter(product => product.category === currentCategory) : products;
        filteredProducts.forEach(product => {
            const productCard = ProductCard({
                product,
                onTap: () => alert(`Adicionado: ${product.name}`)
            });
            productCarousel.appendChild(productCard);
        });
    };

    renderProducts();

    return productsContainer;
};

export default Products;
