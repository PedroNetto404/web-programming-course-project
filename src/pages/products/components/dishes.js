import DishToSelect from './dish-to-select.js';

const Dishes = ({
    dishes,
    selectedDishes,
    onSelect
}) => {
    const containerStyle = {
        'display': 'flex',
        'flex-direction': 'column',
        'gap': '10px',
    };

    const template = `
        <div class="dishes-container" style="${Object.keys(containerStyle).map(key => `${key}: ${containerStyle[key]};`).join('')}">
            ${dishes.map(dish => DishToSelect({
        dish,
        onSelect: (dish, isSelected) => {
            if (isSelected) {
                selectedDishes.push(dish);
            } else {
                const index = selectedDishes.findIndex(d => d.id === dish.id);
                if (index > -1) {
                    selectedDishes.splice(index, 1);
                }
            }
            onSelect(selectedDishes);
        }
    }).outerHTML).join('')}
        </div>
    `;

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = template.trim();
    return tempDiv.firstChild;
};

export default Dishes;
