import orderController from "../../controllers/order-controller.js";
import menuController from "../../controllers/menu-controller.js";

import AppBar from "../../shared/components/app-bar.js";
AppBar();

const createItemImg = ({ image, name }) => {
    const img = document.createElement('img');
    img.src = image;
    img.alt = name;
    img.style.width = '600px';
    img.style.height = '400px';
    return img;
}

document.addEventListener('DOMContentLoaded', () => {
    let currentIndex = 0;

    const goToNextItem = async (isNext) => {
        const todayMenu = await menuController.getTodaysMenus();
        const menuItemsCount = todayMenu.length;

        let nextIndex = isNext ? currentIndex + 1 : currentIndex - 1;
        nextIndex = nextIndex < 0 ?
            menuItemsCount - 1 :
            nextIndex >= menuItemsCount ?
                nextIndex % menuItemsCount :
                nextIndex;

        if (nextIndex === currentIndex) return;

        currentIndex = nextIndex;
        updateItem(currentIndex);
    }

    document.getElementById('prev-button').addEventListener('click', () => goToNextItem(false));
    document.getElementById('next-button').addEventListener('click', () => goToNextItem(true));

    const updateItem = async () => {
        const menuItems = await menuController.getTodaysMenus();
        const currentItem = menuItems[currentIndex];

        const $itemContainer = document.getElementById('menu-item');
        $itemContainer.innerHTML = '';
        $itemContainer.appendChild(createItemImg(currentItem));
        $itemContainer.innerText = currentItem.name;
    }

    // selectButton.addEventListener('click', () => {
    //     selectionModal.style.display = 'block';
    //     optionsDiv.innerHTML = '';

    //     const selectedItem = menuItems[currentIndex];
    //     const proteinDay = Object.keys(proteinOptions)[new Date().getDay() - 1];
    //     const proteins = proteinOptions[proteinDay];
    //     const sides = sideOptions[proteinDay];

    //     if (selectedItem.name === 'Caldos 500ml') {
    //         optionsDiv.innerHTML += '<h3>Tipos de Caldo</h3>';
    //         soupOptions.forEach(soup => {
    //             optionsDiv.innerHTML += `<label><input type="radio" name="soup" value="${soup}"> ${soup}</label><br>`;
    //         });
    //     } else {
    //         if (selectedItem.requiredProteins > 0) {
    //             optionsDiv.innerHTML += '<h3>Proteínas</h3>';
    //             proteins.forEach(protein => {
    //                 optionsDiv.innerHTML += `<label><input type="checkbox" name="protein" value="${protein}"> ${protein}</label><br>`;
    //             });
    //         }

    //         if (selectedItem.requiredSides > 0) {
    //             optionsDiv.innerHTML += '<h3>Guarnições</h3>';
    //             sides.forEach(side => {
    //                 optionsDiv.innerHTML += `<label><input type="checkbox" name="side" value="${side}"> ${side}</label><br>`;
    //             });
    //         }
    //     }

    //     optionsDiv.innerHTML += '<h3>Extras</h3>';
    //     extraOptions.forEach(extra => {
    //         optionsDiv.innerHTML += `<label><input type="checkbox" name="extra" value="${extra}"> ${extra}</label><br>`;
    //     });
    // });

    // closeModal.addEventListener('click', () => {
    //     selectionModal.style.display = 'none';
    // });

    // addToCartButton.addEventListener('click', () => {
    //     const selectedItem = menuItems[currentIndex];
    //     const selectedProteins = document.querySelectorAll('input[name="protein"]:checked');
    //     const selectedSides = document.querySelectorAll('input[name="side"]:checked');
    //     const selectedExtras = document.querySelectorAll('input[name="extra"]:checked');

    //     if (selectedProteins.length < selectedItem.requiredProteins) {
    //         alert(`Por favor, selecione pelo menos ${selectedItem.requiredProteins} proteína(s).`);
    //         return;
    //     }

    //     if (selectedSides.length < selectedItem.requiredSides) {
    //         alert(`Por favor, selecione pelo menos ${selectedItem.requiredSides} guarnição(ões).`);
    //         return;
    //     }

    //     const extras = Array.from(selectedExtras).map(extra => extra.value);
    //     const extraCost = extras.reduce((total, extra) => total + extraPrices[extra], 0);

    //     const item = {
    //         name: selectedItem.name,
    //         price: selectedItem.price + extraCost
    //     };

    //     orderController.create(item);
    //     alert('Item adicionado ao carrinho!');

    //     selectionModal.style.display = 'none';
    // });
});