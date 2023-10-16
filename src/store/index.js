import { createStore } from 'vuex';

import moviesModule from './movies/moviesModule.js';

const store = createStore({
    modules: {
        movies: moviesModule
    }
});

export default store;