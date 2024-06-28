'use strict';

import constants from '../constants.js';
const { Colors } = constants;

const navigationItemsStyle = {
    'display': 'flex',
    'list-style-type': 'none',
    'justify-content': 'space-between',
    'gap': '20px',
    'align-items': 'center'
};

const navigationItems = [
    {
        text: 'Home',
        link: '/src/pages/homepage/index.html',
        icon: 'fa-solid fa-house'
    },
    {
        text: 'Pedidos',
        link: '/src/pages/products/index.html',
        icon: 'fa-solid fa-box'
    },
    {
        text: 'Cardápio',
        link: '/src/pages/menu/',
        icon: 'fa-solid fa-utensils'
    },
    {
        text: 'Contato',
        link: '/src/pages/contact/',
        icon: 'fa-solid fa-envelope'
    }
];

const headerStyle = {
    display: 'flex',
    'justify-content': 'space-between',
    'align-items': 'center',
    padding: '10px 20px',
    color: Colors.foreground,
    'box-shadow': '0 2px 4px rgba(0, 0, 0, 0.1)',
    position: 'fixed',
    width: '100%',
    background: Colors.primary
};

const AppBar = () => {
    const appBarTemplate = `
    <header
        style="${Object.keys(headerStyle)
            .map(key => `${key}: ${headerStyle[key]};`)
            .join('')}"
    >
        <div>
            <h1>
                <a 
                    href="/src/pages/homepage/index.html" 
                    style="
                        text-decoration: none; 
                        color: var(--foreground-color);
                    "
                >
                    <img 
                        src="${constants.LogoUrl}"
                        alt="Marmitaria do Ó" 
                        style="
                            height: 40px;
                        "
                    >
                </a>
            </h1>
        </div>
        <div>
            <nav>
                <ul
                    style="${Object.keys(navigationItemsStyle)
            .map(key => `${key}: ${navigationItemsStyle[key]};`)
            .join('')}"
                >
                    ${navigationItems.map(item => `
                        <li>
                            <a 
                                href="${item.link}"
                                style="text-decoration: none;"
                            >
                                <i class="${item.icon}" style="margin-right: 8px;"></i>
                                ${item.text}
                            </a>
                        </li>
                    `).join('')}
                </ul>
            </nav>
        </div>
    </header>
    `;

    const $tempDiv = document.createElement('div');
    $tempDiv.innerHTML = appBarTemplate.trim();
    const $appBar = $tempDiv.firstChild;

    const ThemeSwitcher = () => {
        const themeSwitcherStyle = {
            'background-color': 'transparent',
            'border': 'none',
            'cursor': 'pointer',
            'font-size': '24px'
        };

        const template = `
        <button 
            id="themeSwitcher" 
            style="${Object.keys(themeSwitcherStyle)
                .map(key => `${key}: ${themeSwitcherStyle[key]};`)
                .join('')}" 
            aria-label="Mudar tema"
        >
            <i class="fa-solid fa-moon"></i>
        </button>
        `;

        const $tempDiv = document.createElement('div');
        $tempDiv.innerHTML = template.trim();
        const $themeSwitcher = $tempDiv.firstChild;
        const $themeIcon = $themeSwitcher.querySelector('i');

        const updateIcon = () => {
            const currentTheme = document.documentElement.getAttribute('theme');
            $themeIcon.className = currentTheme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
        };

        const toggleTheme = () => {
            const currentTheme = document.documentElement.getAttribute('theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            document.documentElement.setAttribute('theme', newTheme);
            localStorage.setItem('theme', newTheme);
        };

        $themeSwitcher.addEventListener('click', () => {
            toggleTheme();
            updateIcon();
        });

        document.addEventListener('DOMContentLoaded', updateIcon);

        return $themeSwitcher;
    };

    document.addEventListener('DOMContentLoaded', () => {
        const $themeSwitcher = ThemeSwitcher();
        $appBar.appendChild($themeSwitcher);
        document.body.insertBefore($appBar, document.body.firstChild);
    });
};

export default AppBar;
