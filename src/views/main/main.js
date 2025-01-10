import { AbsrtractView } from "../../common/view.js";
import onChange from "on-change";
import { Header } from "../../components/header/header.js";
import { Search } from "../../components/search/search.js";
import { CardList } from "../../components/card-list/card-list.js";

export class MainView extends AbsrtractView {
    state = {
        list: [],
        loading: false,
        searchQuery: undefined,
        page: 0,
        error: false,
        amount: undefined,
    }

    constructor(appState) {
        super();
        this.appState = appState;
        this.appState = onChange(this.appState, this.appStateHook.bind(this))
        this.state = onChange(this.state, this.stateHook.bind(this))
        this.setTitle('Filmosval');
    }

    destroy() {
        onChange.unsubscribe(this.appState);
        onChange.unsubscribe(this.state);
        
    }

    appStateHook(path) {
        if (path === 'favorites') {
            this.render()
        }
    }

    async stateHook(path) {
        if (path === 'searchQuery') {
            this.state.loading = true;
            const data = await this.loadList(this.state.searchQuery);
            this.state.amount = data.totalResults;
            this.state.loading = false;

            if (data.Response === 'True') {
                this.state.list = data.Search;

            }
            else {
                this.state.error = true;
                this.state.list = [];
            }
        }

        if (path === 'list' || path === 'loading' || path === 'error') {
            this.render();
        }

    }

    async loadList(query) {
        const res = await fetch(`http://www.omdbapi.com/?apikey=52af31c&s=${query}`);
        const data = await res.json();
        return data;

    }

    render() {
        const main = document.createElement('div');
        if (this.state.list.length === 0) {
            main.innerHTML = `
            <h2>You haven't searched for anything yet</h2>`;
            if (this.state.error) {
                main.innerHTML = '<h2>Movie not found</h2>';
            }
        } else {
            main.innerHTML = `
            <h2>Movies found - ${this.state.amount}</h2>
                `;
        }
        this.app.innerHTML = '';
        this.app.append(main);
        this.renderSearch();
        this.renderCardList();
        this.renderHeader();
    }

    renderHeader() {
        const header = new Header(this.appState).render();
        this.app.prepend(header);
    }

    renderSearch() {
        const search = new Search(this.state).render();
        this.app.append(search);
    }

    renderCardList() {
        const cardList = new CardList(this.appState, this.state).render();
        this.app.append(cardList);  
    }

    
}