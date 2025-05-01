import { createApp } from 'vue';
import { router } from '@/router';
import App from '@/App.vue';
import type { Component } from 'vue';

const app = createApp(App as Component);

app.use(router);

app.mount('#app');
