import { createApp } from 'vue';
import App from './App.vue';
import './assets/index.css';
import router from './routers';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';

const pinia = createPinia();

createApp(App)
	.use(router)
	.use(pinia)
	.use(PrimeVue, {
		theme: {
			preset: Aura,
		},
	})
	.mount('#app');
