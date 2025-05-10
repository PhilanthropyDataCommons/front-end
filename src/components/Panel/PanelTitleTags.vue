<script setup lang="ts">
interface PanelTitleTagsProps {
	className?: string;
}

const { className = '' } = defineProps<PanelTitleTagsProps>();
</script>

<template>
	<div :class="`panel-title-tags ${className}`.trim()">
		<slot></slot>
	</div>
</template>
