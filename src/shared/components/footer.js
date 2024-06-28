import constants from "../constants.js";
const { Colors } = constants;

const FooterStyle = {
    display: 'flex',
    'flex-direction': 'column',
    'justify-content': 'center',
    'align-items': 'center',
    padding: '30px',
    background: Colors.primary,
    width: '100%',
    gap: '20px',
}

const NavStyle = {
    display: 'flex',
    gap: '20px',
    'justify-content': 'space-around',
}

const Footer = () => {
    const template = `
    <footer
        style="${Object.keys(FooterStyle).map(key => `${key}: ${FooterStyle[key]};`).join('')}"
    >
        <div>   
            <p>&copy; 2024 Marmitaria. Todos os direitos reservados.</p>
        </div>
        <nav
            style="width: 100%;"
        >
            <ul
                style="${Object.keys(NavStyle).map(key => `${key}: ${NavStyle[key]};`).join('')}"
            >
                <li><a href="#privacidade">Política de Privacidade</a></li>
                <li><a href="#termos">Termos de Uso</a></li>
            </ul>
        </nav>
    </footer>
    `;

    const $tempDiv = document.createElement('div');
    $tempDiv.innerHTML = template.trim();

    return $tempDiv.firstChild;
}

export default Footer;