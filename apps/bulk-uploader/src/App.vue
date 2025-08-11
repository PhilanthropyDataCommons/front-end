<script setup lang="ts">
import { RouterView } from 'vue-router';
import { SidePanel } from '@pdc/components';
import { ArrowUpCircleIcon } from '@heroicons/vue/24/outline';
import { ArrowUpCircleIcon as ArrowUpCircleIconSolid } from '@heroicons/vue/24/solid';
import { useKeycloak } from '@dsb-norge/vue-keycloak-js';

const { authenticated } = useKeycloak();

const navLinks = [
	{
		icon: ArrowUpCircleIcon,
		activeIcon: ArrowUpCircleIconSolid,
		label: 'Bulk Uploads',
		destination: '/',
	},
];
</script>

<template>
	<div class="App">
		<SidePanel v-if="authenticated" :nav-links="navLinks" />
		<main class="App-main">
			<RouterView v-slot="{ Component }">
				<component :is="Component" />
			</RouterView>
		</main>
	</div>
</template>

<style>
:root {
	--app-banner--space-within: var(--fixed-spacing--halfx)
		var(--fixed-spacing--1x);
	--app-header--space-around: var(--fixed-spacing--2x) var(--fixed-spacing--2x)
		var(--fixed-spacing--1x);
	--app-main--space-around: var(--fixed-spacing--1x);
}

.App {
	position: absolute;
	inset: 0;
	display: flex;
	height: 100vh;
}

.App-main {
	flex: 1;
	position: relative;
	margin: var(--app-main--space-around);
}
</style>
