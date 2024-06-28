const dishStyle = {
    'display': 'flex',
    'align-items': 'center',
    'padding': '10px',
    'border-bottom': '1px solid var(--neutral-color)',
};

const imgStyle = {
    'width': '50px',
    'height': '50px',
    'border-radius': '8px',
    'margin-right': '10px',
};

const textContainerStyle = {
    'flex-grow': '1',
};

const titleStyle = {
    'font-size': '16px',
    'font-weight': 'bold',
};

const descriptionStyle = {
    'font-size': '14px',
    'color': 'var(--neutral-color)',
};

const DishToSelect = ({
    dish,
    onSelect
}) => {
    const { name, description, picture } = dish;

    const template = `
        <div class="dish" style="${Object.keys(dishStyle).map(key => `${key}: ${dishStyle[key]};`).join('')}">
            <input type="checkbox" class="dish-checkbox">
            <img src="${picture}" alt="${name}" style="${Object.keys(imgStyle).map(key => `${key}: ${imgStyle[key]};`).join('')}">
            <div class="text-container" style="${Object.keys(textContainerStyle).map(key => `${key}: ${textContainerStyle[key]};`).join('')}">
                <div class="title" style="${Object.keys(titleStyle).map(key => `${key}: ${titleStyle[key]};`).join('')}">${name}</div>
                <div class="description" style="${Object.keys(descriptionStyle).map(key => `${key}: ${descriptionStyle[key]};`).join('')}">${description}</div>
            </div>
        </div>
    `;

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = template.trim();
    const dishElement = tempDiv.firstChild;

    const checkbox = dishElement.querySelector('.dish-checkbox');
    checkbox.addEventListener('change', () => onSelect(dish, checkbox.checked));

    return dishElement;
};

export default DishToSelect;
