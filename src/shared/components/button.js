import constants from '../constants.js'; 
const { Colors } = constants;

const defaultButtonStyle = {
    display: 'flex',
    'justify-content': 'center',
    'align-items': 'center',
    padding: '10px 20px',
    border: 'none',
    'border-radius': '5px',
    cursor: 'pointer',
    'font-size': '16px',
    'background-color': Colors.primary,
    color: Colors.foreground,
    'box-shadow': '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const buttonContainerStyle = {
    display: 'flex',
    'justify-content': 'center',
    'align-items': 'center',
    background: 'transparent',
};

const Button = ({ 
    type = 'button',
    icon,
    text,
    style = {},
    onClick,
    variant = Colors.primary
}) => {
    const buttonStyle = {
        ...defaultButtonStyle,
        ...style,
    };

    const buttonTemplate = `
    <div 
        class="button-container"
        style="${Object.keys(buttonContainerStyle)
            .map(key => `${key}: ${buttonContainerStyle[key]};`)
            .join('')}"    
    >
        <button
            type="${type}"
            style="${
                Object.keys(buttonStyle)
                    .map(key => `${key}: ${buttonStyle[key]};`)
                    .join('; ')
            }"
            class="custom-button"
        >
            ${icon ? `
                <i 
                    class="${icon}" 
                    style="
                        margin-right: 8px;
                        background: transparent;
                    "
                ></i>
            ` : ''}
            ${text}
        </button>
    </div>
    `;

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = buttonTemplate.trim();
    const buttonElement = tempDiv.firstChild;

    if (onClick) {
        buttonElement.addEventListener('click', onClick);
    }

    return buttonElement;
};

export default Button;
