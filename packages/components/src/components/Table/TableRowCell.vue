<script setup lang="ts">
export interface RowCellProps {
	className?: string;
}

const { className = '' } = defineProps<RowCellProps>();
</script>

<template>
	<td :class="` ${className}`.trim()">
		<slot> </slot>
	</td>
</template>
<style scoped>
td {
	vertical-align: top;
	padding: var(--accessible-spacing--1x);
	border-bottom: var(--table--border-width) solid var(--color--gray--light);
}
</style>
