<script setup lang="ts">
interface PanelBodyProps {
	className?: string;
	padded?: boolean;
}

const { className = '', padded = true } = defineProps<PanelBodyProps>();
</script>

<template>
	<div
		:class="
			`panel-body ${padded ? 'panel-body--padded' : ''} ${className}`.trim()
		"
	>
		<slot></slot>
	</div>
</template>
