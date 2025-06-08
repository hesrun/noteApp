import { makeAutoObservable } from 'mobx';

class UIStore {
    menuOpen = false;
    constructor() {
        makeAutoObservable(this);
    }
    toggleMenu() {
        this.menuOpen = !this.menuOpen;
    }
    closeMenu() {
        this.menuOpen = false;
    }
}
const uiStore = new UIStore();
export default uiStore;
