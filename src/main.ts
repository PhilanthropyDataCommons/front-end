import './assets/main.css';
import { createApp } from 'vue';
import { initRouter } from '@/router';
import App from '@/App.vue';
import type { Component } from 'vue';
import { vueKeycloak } from '@josempgon/vue-keycloak';
import { getOptions } from './KeycloakConfig';
const app = createApp(App as Component);

const keycloakOptions = getOptions(
	import.meta.env.VITE_KEYCLOAK_AUTHORITY,
	import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
	import.meta.env.VITE_KEYCLOAK_REALM,
);

await vueKeycloak.install(app, keycloakOptions);

app.use(initRouter());
app.mount('#app');
