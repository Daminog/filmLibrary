
import { FavoritesView } from "./components/favorites/favorites";
import { FilmView } from "./views/filmView/filmView";
import { MainView } from "./views/main/main";

class App {
    routes = [
        {path: "", view: MainView},
        {path: "#favorites", view: FavoritesView}
    ];

    appState = {
        favorites: []
    };

    checkId(){
      
        const hash = location.hash.substring(1); // Убираем символ # из начала
        const regex = /^tt\d{7}$/; // Регулярное выражение для проверки

        if (regex.test(hash)) {
            return true;
        } else {
            return false;
        }
    }

    constructor() {
        window.addEventListener('hashchange', this.route.bind(this))
        this.route();
    }

    route() {
        if (this.checkId()) {
            const view = new FilmView(this.appState);
            this.currentView = view;
            this.currentView.render();
        } else {
            if (this.currentView) {
                this.currentView.destroy();
            }
            const view = this.routes.find(r => r.path == location.hash).view;
            this.currentView = new view(this.appState);
            this.currentView.render();
        }
        
        
    }
}

new App();