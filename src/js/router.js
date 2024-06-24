import { createRouter, createWebHistory } from 'vue-router';

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
    { path: '/movies', name: 'home', component: MoviesList },
    { path: '/movies/:id', name: 'detail', component: MovieDetail, props: true },
    { path: '/movies/favorites', name: 'favorites', component: MoviesFavorites },
    { path: '/movies/login', name: 'login', component: UserLogin, meta: { requiresUnauth: true } },
    { path: '/movies/singup', name: 'singup', component: UserSingup, meta: { requiresUnauth: true } },
    { path: '/:notFound(.*)', component: NotFound },
  ],
  linkActiveClass: 'is-active',
  linkExactActiveClass: 'is-ex-active',
});

router.beforeEach((to, _, next) => {
  const token = localStorage.getItem('token');

  if (to.meta.requiresUnauth && token) {
    next('movies');
  } else {
    next();
  }
});

export default router;
