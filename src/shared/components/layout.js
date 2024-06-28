import Footer from "./footer.js";
import AppBar from "./app-bar.js";
import constants from "../constants.js";
const { Colors } = constants;

const Layout = ({ content }) => {
    const template = `
        <div>
            ${AppBar().outerHTML}
            <main
                style="
                    padding: 20px;
                    background-color: ${Colors.background};
                    min-height: calc(100vh - 64px - 60px);
                    margin-top: 64px;
                    height: 100vh;
                "
            >
                ${content.outerHTML}
            </main>
            ${Footer().outerHTML}
        </div>
    `;

    const $tempDiv = document.createElement('div');
    $tempDiv.innerHTML = template.trim();

    return $tempDiv.firstChild;
}

export default Layout;
