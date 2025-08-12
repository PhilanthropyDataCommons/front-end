<script setup lang="ts">
interface ColumnActionsProps {
	className?: string;
}

const { className = '' } = defineProps<ColumnActionsProps>();
</script>

<template>
	<div :class="`column-actions ${className}`.trim()">
		<slot> </slot>
	</div>
</template>
