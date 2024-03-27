import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import './plugins/axios';

import './assets/main.css';
import { router } from './router';
import { vuetify } from './plugins/vuetify';

const app = createApp(App);

app.use(createPinia());
app.use(vuetify)
app.use(router);

app.mount('#app');
