<script setup lang="ts">
export interface ColumnActionsProps {
	className?: string;
}

const { className = '' } = defineProps<ColumnActionsProps>();
</script>

<template>
	<div :class="`column-actions ${className}`.trim()">
		<slot> </slot>
	</div>
</template>

<style>
.column-actions {
	display: flex;
	align-items: center;
	gap: var(--accessible-spacing--halfx);
}
</style>
