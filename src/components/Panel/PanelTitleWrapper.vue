<script setup lang="ts">
interface PanelTitleWrapperProps {
	className?: string;
}

const { className = '' } = defineProps<PanelTitleWrapperProps>();
</script>

<template>
	<div :class="`panel-title-wrapper ${className}`.trim()">
		<slot></slot>
	</div>
</template>
