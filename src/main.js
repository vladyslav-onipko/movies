import { createApp } from 'vue'
import App from './App.vue'

import router from './js/router.js';
import BaseButton from './ui/BaseButton.vue';

const app = createApp(App);

app.component('base-button', BaseButton);
app.use(router);

router.isReady().then(() => {
    app.mount('#app');
});
