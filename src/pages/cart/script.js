document.querySelectorAll('.cart-item-quantity-decrease').forEach(button => {
    button.addEventListener('click', function() {
        const quantity = button.nextElementSibling;
        if (parseInt(quantity.value) > 1) {
            quantity.value = parseInt(quantity.value) - 1;
        }
    });
});

document.querySelectorAll('.cart-item-quantity-increase').forEach(button => {
    button.addEventListener('click', function() {
        const quantity = button.previousElementSibling;
        quantity.value = parseInt(quantity.value) + 1;
    });
});

document.querySelectorAll('.cart-item-remove').forEach(button => {
    button.addEventListener('click', function() {
        button.closest('.cart-item').remove();
    });
});