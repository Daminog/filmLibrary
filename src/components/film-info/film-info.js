import { DivComponent } from "../../common/div-component";
import "./film-info.css";

export class FilmInfo extends DivComponent {
    constructor(stateInfo, appState) {
        super();
        this.stateInfo = stateInfo;
        this.appState = appState;
    }

    render() {
        if (this.stateInfo.data.loading) {
            this.el.innerHTML = `<div class="card__list-loader">Loading...</div>`;
            return this.el;
        }

        this.el.innerHTML = ''
        this.el.classList.add('film__info');
        this.el.innerHTML = `
            <h2 class="film__title">${this.stateInfo.data.Title}</h2>
            <div class="film__wrapper">
                <img class="film__poster" src="${this.stateInfo.data.Poster}" width="200" height="230"/>
                <div class="film__description">
                    <ul class="film__description-list">
                        <li class="film__description-element">Actors: ${this.stateInfo.data.Actors}</li>
                        <li class="film__description-element">Author: ${this.stateInfo.data.Writer}</li>
                        <li class="film__description-element">Released: ${this.stateInfo.data.Released}</li>
                        <li class="film__description-element">Runtime: ${this.stateInfo.data.Runtime}</li>
                        <li class="film__description-element">Country: ${this.stateInfo.data.Country}</li>
                    </ul>
                </div>
            </div>
            <div class="film__plot">
                <h3>Plot</h3>
                ${this.stateInfo.data.Plot}
            </div>
        `;

        return this.el
    }

    
}