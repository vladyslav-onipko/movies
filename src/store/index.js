import { createStore } from 'vuex';

import moviesModule from './Movies/moviesModule.js';

const store = createStore({
    modules: {
        movies: moviesModule
    }
});

export default store;