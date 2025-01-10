import { AbsrtractView } from "../../common/view.js";
import onChange from "on-change";
import { Header } from "../../components/header/header.js";
import { CardList } from "../../components/card-list/card-list.js";

export class FavoritesView extends AbsrtractView {
    constructor(appState) {
        super();
        this.appState = appState;
        this.appState = onChange(this.appState, this.appStateHook.bind(this))
        this.setTitle('My Favorites');
    }

    destroy() {
        onChange.unsubscribe(this.appState);
        
    }

    appStateHook(path) {
        if (path === 'favorites') {
            this.render()
        }
    }

    render() {
        const favorites = document.createElement('div');
        favorites.innerHTML = '<h2>My Favorites<h2/>'
        this.app.innerHTML = '';
        this.app.append(favorites);
        this.renderHeader();
        this.renderCardList();
    }

    renderHeader() {
        const header = new Header(this.appState).render();
        this.app.prepend(header);
    }

    renderCardList() {
        const cardList = new CardList(this.appState, { list: this.appState.favorites }).render();
        this.app.append(cardList);  
    }

    
}