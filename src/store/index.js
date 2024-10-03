import {defineStore} from 'pinia';
import axios from 'axios'

export const useSetsStore = defineStore('sets', {
    state: () => ({
        sets: {},
        sortedSets: [],
        pics: {},
        theme: 'auto'
    }),
    actions: {
        async fetchSets() {
            if (Object.keys(this.sets).length === 0) {
                const res = await axios.get('/static/data/sets.json')
                this.sets = res.data;
                const arrayData = Object.entries(this.sets).map(([key, value]) => ({
                    key,
                    ...value
                }));
                arrayData.sort((a, b) => new Date(b.date) - new Date(a.date));
                this.sortedSets = arrayData;
            }
        },
        async fetchPics() {
            if (Object.keys(this.pics).length === 0) {
                const res = await axios.get('/static/data/pics.json')
                this.pics = res.data;
            }
        },
        setTheme(theme) {
            this.theme = theme;
            if (theme === 'auto') localStorage.removeItem("theme")
            else localStorage.theme = theme;
            this.syncTheme();
        },
        syncTheme() {
            if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark')
            } else {
                document.documentElement.classList.remove('dark')
            }
        }
    }
});
