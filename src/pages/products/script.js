import Layout from '../../shared/components/layout.js';
import Products from './components/products.js';
import productController from '../../controllers/product-controller.js';
import menuController from '../../controllers/menu-controller.js';
import Modal from '../../shared/components/modal.js';
import Loading from '../../shared/components/loading.js';

const ProductsPage = (products) => {
    const showModal = async (product) => {
        const dishes = await menuController.getAll();

        const modal = Modal({
            title: `Customize sua ${product.name}`,
            body: `
                <div id="dishes-container"></div>
            `,
            onConfirm: (selectedDishes) => {
                console.log('Selected dishes:', selectedDishes);
                alert(`Adicionado: ${product.name}`);
            },
            onCancel: () => {
                console.log('Modal cancelled');
            },
            onClose: () => {
                console.log('Modal closed');
            }
        });

        modal.open();

        const dishesContainer = document.querySelector('#dishes-container');
        const dishesComponent = Dishes({
            dishes,
            selectedDishes: [],
            onSelect: (selectedDishes) => {
                console.log('Selected dishes:', selectedDishes);
            }
        });
        dishesContainer.appendChild(dishesComponent);
    }

    const productsComponent = Products({
        products,
        onClick: (product) => {
            if (product.category === 'lunchbox' || product.category === 'local-meal') {
                showModal(product);
            } else {
                alert(`Adicionado: ${product.name}`);
            }
        }
    });

    return Layout({ content: productsComponent });
}

(async () => {
    const loading = Loading();

    try {
        const productsPromisse = productController.getAll();
        loading.show();
        const products = await productsPromisse;

        document.body.insertBefore(ProductsPage(products), document.body.firstChild);
    } catch (e) {
        console.error(e);
    } finally {
        loading.hide();
    }
})();