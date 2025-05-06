import { createApp } from 'vue';
import App from './App.vue';
import './assets/index.css';
import router from './routers';
import { createPinia } from 'pinia';
import { VueQueryPlugin } from '@tanstack/vue-query';

const pinia = createPinia();

createApp(App).use(router).use(pinia).use(VueQueryPlugin).mount('#app');
