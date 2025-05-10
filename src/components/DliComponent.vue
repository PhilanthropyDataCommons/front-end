<script setup lang="ts">
interface DliProps {
	className?: string;
}

const { className = '' } = defineProps<DliProps>();
</script>

<template>
	<div :class="`dli ${className}`.trim()">
		<slot></slot>
	</div>
</template>
