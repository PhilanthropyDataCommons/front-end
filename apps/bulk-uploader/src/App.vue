<script setup lang="ts">
import { RouterView } from 'vue-router';
import { AppBanner, AppHeader } from '@pdc/components';
</script>
<template>
	<div class="App">
		<AppBanner />
		<AppHeader />
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

.App-banner {
	grid-area: banner;
	padding: var(--app-banner--space-within);
	background-color: var(--color--gray);
	font-weight: var(--font-weight--medium);
	text-align: center;
}

.App-header {
	grid-area: header;

	margin: var(--app-header--space-around);

	display: flex;
	justify-content: space-between;
	align-items: center;
}

.App-logo {
	aspect-ratio: 4.2;
}

.App-header .App-logo {
	height: 60px;
}

.App-navbar {
	--navbar-item--color: black;
	--navbar-item--background-color: transparent;
}

.App-navbar .dropdown {
	--dropdown--menu--width: 35ch;
}

.App-navbar ul {
	display: flex;
	align-items: center;
	gap: calc(var(--fixed-spacing--1x) * 2);
}

.App-navbar__item {
	all: unset;

	display: flex;
	align-items: flex-start;
	gap: calc(var(--fixed-spacing--1x) / 2);

	font-size: var(--font-size--sm);
	color: var(--navbar-item--color);
	background-color: var(--navbar-item--background-color);
	text-transform: uppercase;
	font-weight: var(--font-weight--bold);
	text-decoration: none;
	padding: var(--fixed-spacing--1x);
	border-radius: 5px;
}

.App-navbar__item:where(a, button, summary) {
	cursor: pointer;
}

.App-navbar__item.active {
	--navbar-item--color: var(--color--blue);
}

.App-navbar__item:where(a, button, summary):is(:hover, :focus-visible) {
	--navbar-item--background-color: #0001;
	--outline: none;
}

.App-navbar__item svg {
	height: 2em;
}

.App-navbar__item--loading {
	color: var(--color--gray--medium);
}

.App-navbar__item--error {
	color: var(--color--red);
}

.App-navbar .logout {
	color: var(--color--red);
}

.App-main {
	grid-area: main;
	position: relative;
	margin: var(--app-main--space-around);
}
</style>
