<script setup lang="ts">
export interface PanelProps {
	className?: string;
	padded?: boolean;
}

const { className = '', padded = false } = defineProps<PanelProps>();
</script>

<template>
	<div :class="`panel ${padded ? 'panel-padded' : ''} ${className}`.trim()">
		<slot></slot>
	</div>
</template>

<style>
:root {
	--panel--padding: var(--fixed-spacing--4x);
}

.panel {
	position: relative;
	padding: var(--panel--padding);
}

.panel-padded {
	padding-left: calc(var(--panel--padding) * 4);
	padding-right: calc(var(--panel--padding) * 4);
}

.panel-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: var(--fixed-spacing--2x);
}

.panel-header-action {
	display: flex;
	align-items: center;
	gap: var(--fixed-spacing--1x);
}

.panel-header-actions-wrapper {
	display: flex;
	align-items: center;
	gap: var(--fixed-spacing--1x);
}

.panel-header-action > a {
	text-decoration: none;
	font-weight: var(--font-weight--medium);
	color: inherit;
}

.panel-header-action svg {
	width: 20px;
	height: 20px;
	padding: 1px;
}
</style>
