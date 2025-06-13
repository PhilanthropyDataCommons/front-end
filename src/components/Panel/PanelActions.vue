<script setup lang="ts">
interface PanelActionsProps {
	className?: string;
}

const { className = '' } = defineProps<PanelActionsProps>();
</script>

<template>
	<div :class="`panel-actions ${className}`.trim()">
		<slot></slot>
	</div>
</template>
