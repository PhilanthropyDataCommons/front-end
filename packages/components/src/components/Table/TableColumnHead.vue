<script setup lang="ts">
export interface ColumnHeadProps {
	className?: string;
	actions?: boolean;
}

const { className = '', actions = false } = defineProps<ColumnHeadProps>();
</script>

<template>
	<th
		:class="
			`
    ${className}
    ${actions ? `has-actions ` : ''}
  `.trim()
		"
	>
		<div class="column-head-wrapper">
			<slot> </slot>
		</div>
	</th>
</template>

<style scoped>
th {
	min-width: 25%;
	vertical-align: bottom;
	white-space: nowrap;
	text-align: left;
	padding: var(--accessible-spacing--1x);
	border-bottom: var(--table--border-width) solid var(--color--gray--light);
}

.has-actions .column-head-wrapper {
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: var(--accessible-spacing--1x);
}
</style>
