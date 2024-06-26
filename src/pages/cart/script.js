import orderController from "../../controllers/order-controller.js";

const createCartItem = (order) => {
    const template = `
        <article class="cart-item" data-id="${order.id}">
            <div class="cart-item-quantity">
                <button class="cart-item-quantity-decrease">
                    <i class="fa fa-minus" style="font-size: 30px;"></i>
                </button>
                <input type="number" value="${order.quantity}" min="1">
                <button class="cart-item-quantity-increase">
                    <i class="fa fa-plus" style="font-size: 30px;"></i>
                </button>
            </div>
            <div>
                <h3>${order.name}</h3>
                <p>${order.description}</p>
                <p>Preço: R$ ${order.price}</p>
            </div>
            <button class="cart-item-remove" style="border-color: transparent;">
                <i class="fa-solid fa-trash" style="font-size: 30px;"></i>  
            </button>
        </article>`;

    const cartItem = document.createElement('div');
    cartItem.innerHTML = template;

    return cartItem;
}

const renderItems = () => {
    const orderItems = orderController.getAll();
    const $cartContent = document.querySelector('.cart-content');

    for (const item of orderItems) {
        const cartItem = createCartItem(item);
        $cartContent.appendChild(cartItem);
    }
}

document.addEventListener('DOMContentLoaded', renderItems);

document.querySelectorAll('.cart-item-quantity-decrease').forEach(button => {
    button.addEventListener('click', function () {
        const quantity = button.nextElementSibling;
        if (parseInt(quantity.value) > 1) {
            quantity.value = parseInt(quantity.value) - 1;
        }
    });
});

document.querySelectorAll('.cart-item-quantity-increase').forEach(button => {
    button.addEventListener('click', function () {
        const quantity = button.previousElementSibling;
        quantity.value = parseInt(quantity.value) + 1;
    });
});

document.querySelectorAll('.cart-item-remove').forEach(button => {
    button.addEventListener('click', function () {
        const $cartItem = button.closest('.cart-item');

        const itemId = $cartItem.dataset.id;
        $cartItem.remove();

        orderController.remove(itemId);
    });
});