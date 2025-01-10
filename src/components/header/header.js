import { DivComponent } from "../../common/div-component";
import './header.css'

 export class Header extends DivComponent {
    constructor(appState) {
        super();
        this.appState = appState;
    }

    render() {
        this.el.innerHTML = '';
        this.el.classList.add('header');
        this.el.innerHTML = `
            <div>
                <img src="/static/logo.svg" width=50 alt="Logo" />
            </div>
            <div>
                <div class="menu">
                    <a class="menu__item" href="#">
                        <img src="/static/search.svg" alt="Search icon" />
                        Find a movie
                    </a>
                    <a class="menu__item" href="#favorites">
                        <img src="/static/favorites.svg" alt="Favorites icon" />
                        Favorites
                        <div class="menu__counter">
                            ${this.appState.favorites.length}
                        </div>
                    </a>
                </div>
            </div>
        `;
        
        return this.el;
    }
 }