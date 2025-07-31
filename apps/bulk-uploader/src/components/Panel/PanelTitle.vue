<script setup lang="ts">
interface PanelTitleProps {
	className?: string;
}

const { className = '' } = defineProps<PanelTitleProps>();
</script>

<template>
	<h1 :class="`panel-title ${className}`.trim()">
		<slot></slot>
	</h1>
</template>
