<script setup lang="ts">
interface PanelBodyProps {
	className?: string;
	padded?: boolean;
	dataPanel?: boolean;
}

const { className = '', padded = true, dataPanel = false } = defineProps<PanelBodyProps>();
</script>

<template>
	<div
		:class="
			`panel-body ${padded ? 'panel-body--padded' : ''} ${dataPanel ? 'panel-body--data-panel' : ''} ${className}`.trim()
		"
	>
		<slot></slot>
	</div>
</template>
