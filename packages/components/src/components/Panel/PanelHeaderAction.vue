<script setup lang="ts">
interface PanelHeaderActionProps {
	className?: string;
}

const { className = '' } = defineProps<PanelHeaderActionProps>();
</script>

<template>
	<div :class="`panel-header-action ${className}`.trim()">
		<slot></slot>
	</div>
</template>
