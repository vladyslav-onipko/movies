import { createApp } from 'vue'
import App from './App.vue'

import FontAwesomeIcon from './assets/fonts/fortawesome/fortawesome-icons.js';

import router from './js/router.js';

const app = createApp(App);

app.component('fontawesome-icon', FontAwesomeIcon);
app.use(router);
app.mount('#app');
