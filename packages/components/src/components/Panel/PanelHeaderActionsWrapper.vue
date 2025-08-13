<script setup lang="ts">
interface PanelHeaderActionsWrapperProps {
	className?: string;
}

const { className = '' } = defineProps<PanelHeaderActionsWrapperProps>();
</script>

<template>
	<div :class="`panel-header-actions-wrapper ${className}`.trim()">
		<slot></slot>
	</div>
</template>
