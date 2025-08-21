<script setup lang="ts">
interface PanelBodyProps {
	className?: string;
	variant?: 'data-panel' | 'padded' | 'data-panel-padded' | 'default';
}

const { className = '', variant = 'default' } = defineProps<PanelBodyProps>();
</script>

<template>
	<div :class="`panel-body  panel-body--${variant} ${className}`.trim()">
		<slot></slot>
	</div>
</template>

<style>
.panel-body {
	background-color: white;
	border-radius: 5px;
}

.panel-body--padded {
	padding: calc(var(--panel--padding));
}

.panel-body--data-panel {
	display: flex;
	flex-direction: column;
	gap: var(--fixed-spacing--4x);
}

.panel-body--data-panel-padded {
	display: flex;
	flex-direction: column;
	gap: var(--fixed-spacing--4x);
	padding: calc(var(--panel--padding));
}
</style>
