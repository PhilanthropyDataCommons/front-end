import { createWebHistory, createRouter } from 'vue-router';
import LandingView from '@/views/LandingView.vue';
import type { Component } from 'vue';

const routes = [{ path: '/', component: LandingView as Component }];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export { router };
