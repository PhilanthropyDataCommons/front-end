import { createApp } from 'vue';
import App from '@/App.vue';
import type { Component } from 'vue';

const app = createApp(App as Component);

app.mount('#app');
