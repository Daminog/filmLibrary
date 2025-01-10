import { DivComponent } from "../../common/div-component";
import './card.css'

 export class Card extends DivComponent {
    constructor(appState, cardInfo) {
        super();
        this.appState = appState;
        this.cardInfo = cardInfo;
    }

    #addToFavorites() {
        this.appState.favorites.push(this.cardInfo);
    }

    #deleteFromFavorites() {
        this.appState.favorites = this.appState.favorites.filter(
            b => b.imdbID !== this.cardInfo.imdbID
        );
    }

    render() {  
        this.el.classList.add('card');
        const existInFavorites = this.appState.favorites.find(
            b => b.imdbID == this.cardInfo.imdbID
        );
        this.el.innerHTML = `
        <div class='image__wrapper'>
            <img src="${this.cardInfo.Poster !== "N/A" ? this.cardInfo.Poster : '/static/poster-error.png' }" alt="Movie poster" class="card__image" loading="lazy"/>
        </div>
        <div class="card__info">
            <h3 class="card__title"> ${this.cardInfo.Title}</h3>
            <p class="card__year">${this.cardInfo.Year}</p>
            <div class="card__footer">
                <button class="button__add ${existInFavorites ? 'button__active' : ''}">
                    ${existInFavorites
                        ? '<img src="/static/favorites.svg"/>'
                        : '<img src="/static/favorites-white.svg"/>'
                    }
                </button>
                <a href="#${this.cardInfo.imdbID}" class="button__film">
                    <p>Watch</p>
                </a>
            </div>
        </div>
    `
        
        if (existInFavorites) {
            this.el.querySelector('button').addEventListener('click', this.#deleteFromFavorites.bind(this));
        } else {
            this.el.querySelector('button').addEventListener('click', this.#addToFavorites.bind(this));
        }

        return this.el;
    }
}