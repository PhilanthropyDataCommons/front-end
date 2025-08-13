<template>
	<nav class="side-panel">
		<RouterLink to="/">
			<img
				src="../public/pdc-logo.png"
				alt="Philanthropy Data Commons logo"
				class="side-panel-logo"
			/>
		</RouterLink>
		<div class="side-panel-nav-links">
			<div
				v-for="link in navLinks"
				:key="link.label"
				class="side-panel-nav-item"
				:class="{ active: link.destination === $route.path }"
			>
				<component
					:is="link.activeIcon"
					v-if="link.destination === $route.path"
					class="side-panel-nav-item-icon"
				/>
				<component :is="link.icon" v-else class="side-panel-nav-item-icon" />
				<RouterLink :to="link.destination" class="side-panel-nav-item-link">
					{{ link.label }}
				</RouterLink>
			</div>
		</div>
		<div class="side-panel-footer">
			<UserComponent />
		</div>
	</nav>
</template>

<script setup lang="ts">
import type { FunctionalComponent, HTMLAttributes, VNodeProps } from 'vue';
import { RouterLink } from 'vue-router';
import UserComponent from './UserComponent.vue';

interface SidePanelLinkProps {
	navLinks?: Array<{
		icon: FunctionalComponent<HTMLAttributes & VNodeProps>;
		activeIcon: FunctionalComponent<HTMLAttributes & VNodeProps>;
		label: string;
		destination: string;
	}>;
}
const { navLinks = undefined } = defineProps<SidePanelLinkProps>();
</script>

<style scoped>
.side-panel {
	width: 100%;
	max-width: 240px;
	flex-shrink: 0;
	display: flex;
	flex-direction: column;
	position: sticky;
	top: 0;
	height: 100vh;
	background-color: var(--color--white);
	padding: var(--fixed-spacing--2x);

	@media (max-width: 768px) {
		display: none;
	}
}

.side-panel-logo {
	width: 200px;
	height: auto;
}
.side-panel-nav-links {
	padding-left: var(--fixed-spacing--1x);
	padding-right: var(--fixed-spacing--1x);
	margin-top: var(--fixed-spacing--4x);
	display: flex;
	flex-direction: column;
	gap: var(--fixed-spacing--1x);
}
.side-panel-nav-item {
	display: flex;
	align-items: center;
	gap: var(--fixed-spacing--halfx);
}
.side-panel-nav-item.active {
	color: var(--color--blue);
}

.side-panel-nav-item-link {
	text-decoration: none;
	color: inherit;
	font-weight: var(--font-weight--medium);
}
.side-panel-nav-item-icon {
	width: 20px;
	height: 20px;
}
.side-panel-footer {
	margin-top: auto;
	padding-left: var(--fixed-spacing--1x);
	padding-right: var(--fixed-spacing--1x);
	margin-bottom: var(--fixed-spacing--2x);
}
</style>
