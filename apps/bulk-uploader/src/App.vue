<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>
<template>
	<div class="App">
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

	display: grid;
	grid-template:
		'banner' min-content
		'header' min-content
		'main' 1fr
		/ auto;
}

.App-main {
	grid-area: main;
	position: relative;
	margin: var(--app-main--space-around);
}
</style>
