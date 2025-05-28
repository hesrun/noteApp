import { makeAutoObservable } from 'mobx';

class ThemeStore {
    theme = 'light';

    constructor() {
        makeAutoObservable(this);

        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            this.setTheme(savedTheme);
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            this.setTheme('dark');
        } else {
            this.setTheme('light');
        }
    }

    setTheme(theme) {
        this.theme = theme;
        localStorage.setItem('theme', theme);

        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }

    toggleTheme() {
        this.setTheme(this.theme === 'dark' ? 'light' : 'dark');
    }
}

const themeStore = new ThemeStore();
export default themeStore;
