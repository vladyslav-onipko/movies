import { createStore } from 'vuex';

import moviesModule from './movies/moviesModule.js';
import authModule from './auth/authModule.js';

const store = createStore({
    modules: {
        movies: moviesModule,
        auth: authModule
    }
});

export default store;