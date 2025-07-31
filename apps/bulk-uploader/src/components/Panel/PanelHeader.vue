<script setup lang="ts">
interface PanelHeaderProps {
	className?: string;
	padded?: boolean;
}

const { className = '', padded = true } = defineProps<PanelHeaderProps>();
</script>

<template>
	<div
		:class="
			`panel-header ${padded ? 'panel-header--padded' : ''} ${className}`.trim()
		"
	>
		<slot></slot>
	</div>
</template>
