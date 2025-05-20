<script setup lang="ts">
interface PanelGridItemProps {
	className?: string;
}

const { className = '' } = defineProps<PanelGridItemProps>();
</script>

<template>
	<div :class="`panel-grid-item ${className}`.trim()">
		<slot></slot>
	</div>
</template>
