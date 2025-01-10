
import onChange from "on-change";
import { AbsrtractView } from "../../common/view.js";
import { Header } from "../../components/header/header.js";
import { FilmInfo } from "../../components/film-info/film-info.js";

export class FilmView extends AbsrtractView {

    state = {
        data: null,
        loading: false,
    }
    constructor(appState) {
        super();
        this.appState = appState;
        this.state = onChange(this.state, this.stateHook.bind(this));
        this.appState = onChange(this.appState, this.appStateHook.bind(this))
        this.loadFilm()
    }

    destroy() {
        return
    }

    async appStateHook(path) {
        if (path === 'favorites') {
            this.render();
        }
    }

    async stateHook(path) {
        if (path === 'loading') {
            this.render();
        }

        if (path === 'data') {
            this.render();
        }

    }

    async loadFilm() {
        this.state.loading = true;
        const res = await fetch(`http://www.omdbapi.com/?apikey=52af31c&i=${location.hash.substring(1)}`);
        const data = await res.json();
        this.state.loading = false;
        
        this.state.data = data;
    }

    render() {
        const main = document.createElement('div');
        this.app.innerHTML = '';
        this.app.append(main);
        if (this.state.data) {
            this.renderFilmInfo();
            console.log(this.state.data)
            this.renderHeader();
        }
    }

    renderHeader() {
        const header = new Header(this.appState).render();
        this.app.prepend(header);
    }

    renderFilmInfo() {
        const filmInfo = new FilmInfo(this.state, this.appState).render();
        this.app.append(filmInfo);
    }


    
}