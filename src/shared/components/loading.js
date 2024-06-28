const loadingStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'rgba(0, 0, 0, 0.8)',
    color: '#fff',
    padding: '20px',
    'border-radius': '8px',
    'z-index': '1002',
    'display': 'none',
    'font-size': '18px',
    'text-align': 'center',
    'animation': 'fadeIn 0.5s ease-in-out',
};

const spinnerStyle = {
    'border': '4px solid rgba(255, 255, 255, 0.3)',
    'border-top': '4px solid #fff',
    'border-radius': '50%',
    'width': '40px',
    'height': '40px',
    'animation': 'spin 1s linear infinite',
    'margin-bottom': '10px',
};

const styles = `
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

@keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
}
`;

const Loading = () => {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = styles;
    document.head.appendChild(styleTag);

    const template = `
        <div id="loading" style="${Object.keys(loadingStyle).map(key => `${key}: ${loadingStyle[key]};`).join(';')}">
            <div style="${Object.keys(spinnerStyle).map(key => `${key}: ${spinnerStyle[key]};`).join(';')}"></div>
            Carregando...
        </div>
    `;

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = template.trim();
    const loadingElement = tempDiv.firstChild;

    const show = () => {
        loadingElement.style.display = 'flex';
    };

    const hide = () => {
        loadingElement.style.display = 'none';
    };

    document.addEventListener('DOMContentLoaded', () => {
        const existingLoadingElement = document.querySelector('#loading');
        if (existingLoadingElement) {
            existingLoadingElement.remove();
        }

        document.body.appendChild(loadingElement);
    });

    return {
        show,
        hide
    };
};

export default Loading;
