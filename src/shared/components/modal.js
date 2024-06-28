import Button from "./button.js";
import constants from '../constants.js';
const { Colors } = constants;

function Modal({
    title,
    body,
    onConfirm,
    onCancel,
    onClose
}) {
    const modalStyle = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: Colors.background,
        padding: '20px',
        'border-radius': '8px',
        'box-shadow': '0 2px 10px rgba(0, 0, 0, 0.1)',
        'z-index': '1001',
        'max-width': '500px',
        width: '100%',
    };

    const headerStyle = {
        display: 'flex',
        'justify-content': 'space-between',
        'align-items': 'center',
        'border-bottom': `1px solid ${Colors.neutral}`,
        'padding-bottom': '10px',
        'margin-bottom': '20px',
    };

    const bodyStyle = {
        'margin-bottom': '20px',
    };

    const footerStyle = {
        display: 'flex',
        'justify-content': 'flex-end',
        gap: '10px',
    };

    const overlayStyle = {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.5)',
        'z-index': '1000',
    };

    const Header = () => {
        const template = `
            <div style="${Object.keys(headerStyle).map(key => `${key}: ${headerStyle[key]};`).join('')}">
                <h2>${title}</h2>
                <button class="modal-close-button" style="background: none; border: none; cursor: pointer; font-size: 20px;">
                    &times;
                </button>
            </div>
        `;

        const $tempDiv = document.createElement('div');
        $tempDiv.innerHTML = template.trim();
        const $header = $tempDiv.firstChild;

        $header.querySelector('.modal-close-button').addEventListener('click', handleClose);

        return $header;
    }

    const Body = () => {
        const template = `
            <div style="${Object.keys(bodyStyle).map(key => `${key}: ${bodyStyle[key]};`).join('')}">
                ${body}
            </div>
        `;

        const $tempDiv = document.createElement('div');
        $tempDiv.innerHTML = template.trim();
        return $tempDiv.firstChild;
    }

    const Footer = () => {
        const template = `
            <div style="${Object.keys(footerStyle).map(key => `${key}: ${footerStyle[key]};`).join('')}">
                ${Button({ text: 'Cancel', style: { background: Colors.error }, onClick: handleCancel }).outerHTML}
                ${Button({ text: 'Confirm', style: { background: Colors.success }, onClick: handleConfirm }).outerHTML}
            </div>
        `;

        const $tempDiv = document.createElement('div');
        $tempDiv.innerHTML = template.trim();
        const $footer = $tempDiv.firstChild;

        $footer.querySelector('.custom-button:nth-child(1)').addEventListener('click', handleCancel);
        $footer.querySelector('.custom-button:nth-child(2)').addEventListener('click', handleConfirm);

        return $footer;
    }

    const Backdrop = () => {
        const $backdrop = document.createElement('div');
        $backdrop.style.cssText = Object.keys(overlayStyle).map(key => `${key}: ${overlayStyle[key]};`).join('; ');
        $backdrop.addEventListener('click', handleClose);
        return $backdrop;
    }

    const template = `
        <div style="${Object.keys(modalStyle).map(key => `${key}: ${modalStyle[key]};`).join('')}">
            ${Header().outerHTML}
            ${Body().outerHTML}
            ${Footer().outerHTML}
        </div>
    `;

    const $tempDiv = document.createElement('div');
    $tempDiv.innerHTML = template.trim();
    const $modal = $tempDiv.firstChild;

    const handleOpen = () => {
        document.body.appendChild(Backdrop());
        document.body.appendChild($modal);
    };

    const handleClose = () => {
        const backdrop = document.querySelector('#modal-backdrop');
        if (backdrop) backdrop.remove();
        $modal.remove();
        if (onClose) onClose();
    };

    const handleConfirm = () => {
        if (onConfirm) onConfirm();
        handleClose();
    };

    const handleCancel = () => {
        if (onCancel) onCancel();
        handleClose();
    };

    return {
        open: handleOpen,
        close: handleClose
    };
}

export default Modal;
