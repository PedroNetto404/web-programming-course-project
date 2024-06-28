const DishToSelectComponent = (dish) => `
    <div class="select-dish"
        style="
            display: flex;
            gap: 1rem;
            align-items: center;
            padding: 1rem;
            border-radius: 1rem;
            background-color: #f7f7f7;
        "
    >
        <!-- Check box for dish -->
        <input type="checkbox" name="dish" value="${dish.id}">
        <div class="dish-info"
            style="
                display: flex;
                gap: 1rem;
                align-items: center;
            "
        >
            <img src="${dish.picture}" alt="${dish.name}">
            <div>
                <h2>${dish.name}</h2>
                <p>${dish.description}</p>
            </div>
        </div>
    </div>
`;

const renderDishes = (dishes) => {
    const $dishesContainer = document.getElementById('dishes-container');

    const mains = dishes.filter(dish => dish.type === 'main');
    const sides = dishes.filter(dish => dish.type === 'side');
    const accompaniments = dishes.filter(dish => dish.type === 'accompaniment');

    $dishesContainer.innerHTML = `
        <div
            style="
                display: flex;
                gap: 2rem;
                flex-wrap: wrap;
            "
        >
            <div class="main-dishes">
                <h1>Principais</h1>
                ${mains.map(DishToSelectComponent).join('')}
            </div>
            <div class="side-dishes">
                <h1>Acompanhamentos</h1>
                ${sides.map(DishToSelectComponent).join('')}
            </div>
            <div class="accompaniments">
                <h1>Guarnições</h1>
                ${accompaniments.map(DishToSelectComponent).join('')}
            </div>
        </div>
    `;
}