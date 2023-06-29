import { createRouter, createWebHistory } from "vue-router";

import FilmsList from '../pages/Films/FilmsList.vue';
import FilmsDetail from '../pages/Films/FilmsDetail.vue';
import FaviritesList from '../pages/Favorites/FavoritesList.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: 'films' },
        { path: '/films', component: FilmsList },
        { path: '/films/:id', component: FilmsDetail },
        { path: '/favorites', component: FaviritesList }
    ],
    linkActiveClass: 'is-active',
    linkExactActiveClass: 'is-ex-active'
});

export default router;