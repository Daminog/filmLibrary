import { DivComponent } from "../../common/div-component";
import { Card } from "../../components/card/card.js";
import './card-list.css'

 export class CardList extends DivComponent {
    constructor(appState, state) {
        super();
        this.appState = appState;
        this.state = state;
    }

    render() {
        if (this.state.loading) {
            this.el.innerHTML = `<div class="card__list-loader">Loading...</div>`;
            return this.el;
        }

        this.el.classList.add('card__list');
        for(const card of this.state.list) {
            this.el.append(new Card(this.appState, card).render());
        }
        return this.el;
    }
 }