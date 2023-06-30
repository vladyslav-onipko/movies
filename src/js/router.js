import { createRouter, createWebHistory } from "vue-router";

import MoviesList from '../pages/Movies/MoviesList.vue';
import MovieDetail from '../pages/Movies/MovieDetail.vue';
import FaviritesList from '../pages/Favorites/FavoritesList.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: 'movies' },
        { path: '/movies', component: MoviesList },
        { path: '/movies/:id', component: MovieDetail },
        { path: '/favorites', component: FaviritesList }
    ],
    linkActiveClass: 'is-active',
    linkExactActiveClass: 'is-ex-active'
});

export default router;