import orderController from "../../controllers/order-controller.js";

document.addEventListener('DOMContentLoaded', () => {
    const menuItems = [
        { name: 'Marmita P', price: 17.00, requiredProteins: 1, requiredSides: 2, image: '../../images/MarmitaP.png' },
        { name: 'Marmita M', price: 22.00, requiredProteins: 2, requiredSides: 2, image: '../../images/MarmitaM.png' },
        { name: 'Marmita G', price: 25.00, requiredProteins: 2, requiredSides: 2, image: '../../images/MarmitaG.png' },
        { name: 'Executiva', price: 25.00, requiredProteins: 2, requiredSides: 2, image: '../../images/executivo.jpg' },
        { name: 'Prato feito P', price: 17.00, requiredProteins: 1, requiredSides: 2, image: '../../images/PratoP.png' },
        { name: 'Prato feito G', price: 25.00, requiredProteins: 2, requiredSides: 2, image: '../../images/PratoG.png' },
        { name: 'Caldos 500ml', price: 23.00, requiredProteins: 0, requiredSides: 0, image: '../../images/caldoCostela.webp' }
    ];

    const extraPrices = {
        'Coca-Cola 350ml': 6.00,
        'Coca-Cola 600ml': 8.00,
        'Coca-Cola 2l': 10.00,
        'Pepsi 350ml': 6.00
    };

    const proteinOptions = {
        'Segunda': ['Frango a Passarinho', 'Carne de Panela', 'Linguiça toscana acebolada'],
        'Terça': ['Picadinho de carne', 'Sobrecoxa ao molho', 'Pernil suíno em cubos'],
        'Quarta': ['Costela Bovina', 'Feijoada', 'Picadinho de Frango'],
        'Quinta': ['Almôndegas ao molho', 'Dobradinha', 'Coxa e Sobrecoxa assada'],
        'Sexta': ['Dobradinha', 'Carne de Panela', 'Estrogonofe de Frango'],
        'Sábado': ['Filé de frango grelhado', 'Feijoada', 'Costela Bovina']
    };

    const sideOptions = {
        'Segunda': ['Farofa Temperada', 'Chuchu com Cenoura', 'Repolho com tomate'],
        'Terça': ['Bolinho de arroz', 'Polenta cremosa', 'Berinjela refogada'],
        'Quarta': ['Cabotia refogada', 'Berinjela Frita', 'Feijão Tropeiro'],
        'Quinta': ['Purê de Cabotia', 'Jiló refogado', 'Torta de abobrinha'],
        'Sexta': ['Cabotia refogada', 'Charuto de repolho', 'Macarrão á bolonhesa'],
        'Sábado': ['Farofa de torresmo', 'Cabotia refogada', 'Macarrão alho e óleo']
    };

    const extraOptions = [
        'Coca-Cola 350ml',
        'Coca-Cola 600ml',
        'Coca-Cola 2l',
        'Pepsi 350ml'
    ];

    const soupOptions = ['Costela', 'Mandioquinha', 'Carne seca'];

    let currentIndex = 0;
    const menuItemDisplay = document.getElementById('menu-item');
    const menuItemImage = document.createElement('img'); // Criando a tag img dinamicamente
    const menuItemName = document.getElementById('menu-item-name');
    const selectButton = document.getElementById('select-button');
    const selectionModal = document.getElementById('selection-modal');
    const closeModal = document.getElementById('close-modal');
    const optionsDiv = document.getElementById('options');
    const addToCartButton = document.getElementById('add-to-cart-button');
    const cartButton = document.getElementById('view-cart-button');

    function updateMenuItem() {
        const selectedItem = menuItems[currentIndex];
        console.log(selectedItem)
        if(selectedItem.image) {
            menuItemImage.src = selectedItem.image; // Definindo o caminho da imagem
        }

        menuItemImage.alt = selectedItem.name;
        menuItemImage.style.width = '600px';
        menuItemImage.style.height = '400px';

        menuItemDisplay.innerHTML = ''; // Limpa o conteúdo anterior
        menuItemDisplay.appendChild(menuItemImage); // Adiciona a imagem
        menuItemDisplay.innerText = selectedItem.name;
    }

    document.getElementById('prev-button').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + menuItems.length) % menuItems.length;
        updateMenuItem();
    });

    document.getElementById('next-button').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % menuItems.length;
        updateMenuItem();
    });

    selectButton.addEventListener('click', () => {
        selectionModal.style.display = 'block';
        optionsDiv.innerHTML = '';

        const selectedItem = menuItems[currentIndex];
        const proteinDay = Object.keys(proteinOptions)[new Date().getDay() - 1];
        const proteins = proteinOptions[proteinDay];
        const sides = sideOptions[proteinDay];

        if (selectedItem.name === 'Caldos 500ml') {
            optionsDiv.innerHTML += '<h3>Tipos de Caldo</h3>';
            soupOptions.forEach(soup => {
                optionsDiv.innerHTML += `<label><input type="radio" name="soup" value="${soup}"> ${soup}</label><br>`;
            });
        } else {
            if (selectedItem.requiredProteins > 0) {
                optionsDiv.innerHTML += '<h3>Proteínas</h3>';
                proteins.forEach(protein => {
                    optionsDiv.innerHTML += `<label><input type="checkbox" name="protein" value="${protein}"> ${protein}</label><br>`;
                });
            }

            if (selectedItem.requiredSides > 0) {
                optionsDiv.innerHTML += '<h3>Guarnições</h3>';
                sides.forEach(side => {
                    optionsDiv.innerHTML += `<label><input type="checkbox" name="side" value="${side}"> ${side}</label><br>`;
                });
            }
        }

        optionsDiv.innerHTML += '<h3>Extras</h3>';
        extraOptions.forEach(extra => {
            optionsDiv.innerHTML += `<label><input type="checkbox" name="extra" value="${extra}"> ${extra}</label><br>`;
        });
    });

    closeModal.addEventListener('click', () => {
        selectionModal.style.display = 'none';
    });

    addToCartButton.addEventListener('click', () => {
        const selectedItem = menuItems[currentIndex];
        const selectedProteins = document.querySelectorAll('input[name="protein"]:checked');
        const selectedSides = document.querySelectorAll('input[name="side"]:checked');
        const selectedExtras = document.querySelectorAll('input[name="extra"]:checked');

        if (selectedProteins.length < selectedItem.requiredProteins) {
            alert(`Por favor, selecione pelo menos ${selectedItem.requiredProteins} proteína(s).`);
            return;
        }

        if (selectedSides.length < selectedItem.requiredSides) {
            alert(`Por favor, selecione pelo menos ${selectedItem.requiredSides} guarnição(ões).`);
            return;
        }

        const extras = Array.from(selectedExtras).map(extra => extra.value);
        const extraCost = extras.reduce((total, extra) => total + extraPrices[extra], 0);

        const item = {
            name: selectedItem.name,
            price: selectedItem.price + extraCost
        };

        orderController.create(item);
        alert('Item adicionado ao carrinho!');

        selectionModal.style.display = 'none';
    });
});

localStorage.setItem('theme', 'dark');
document.documentElement.setAttribute('theme', 'dark');