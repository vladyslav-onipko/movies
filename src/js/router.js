import { createRouter, createWebHistory } from "vue-router";

import MoviesList from '../pages/Movies/MoviesList.vue';
import MovieDetail from '../pages/Movies/MovieDetail.vue';
import MoviesFavorites from '../pages/Movies/MoviesFavorites.vue';
import NotFound from '../pages/NotFound/NotFound.vue';
import UserLogin from '../pages/Authentication/UserLogin.vue';
import UserSingup from '../pages/Authentication/UserSingup.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: 'movies' },
        { path: '/movies', component: MoviesList },
        { path: '/movies/:id', component: MovieDetail, props: true },
        { path: '/favorites', component: MoviesFavorites },
        { path: '/login', component: UserLogin, meta: { requiresUnauth: true } },
        { path: '/singup', component: UserSingup, meta: { requiresUnauth: true } },
        { path: '/:notFound(.*)', component: NotFound }
    ],
    linkActiveClass: 'is-active',
    linkExactActiveClass: 'is-ex-active'
});

export default router;