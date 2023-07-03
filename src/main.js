import { createApp } from 'vue'
import App from './App.vue'

import router from './js/router.js';
import store from './store/index.js';

import BaseButton from './ui/BaseButton.vue';
import BaseSection from './ui/BaseSection.vue';

const app = createApp(App);

app.component('base-button', BaseButton);
app.component('base-section', BaseSection);

app.use(store);
app.use(router);

router.isReady().then(() => {
    app.mount('#app');
});
