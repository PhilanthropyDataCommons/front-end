<script setup lang="ts">
export interface TableProps {
	className?: string;
	/**
	 * Table body cells won't wrap and will have a max-width,
	 * above which the text will be hidden.
	 */
	truncate?: boolean;
}

const { className = '', truncate = false } = defineProps<TableProps>();
</script>

<template>
	<table
		:border="0"
		:cellPadding="0"
		:cellSpacing="0"
		:class="`table ${truncate ? 'truncate' : ''} ${className}`.trim()"
	>
		<slot> </slot>
	</table>
</template>

<style>
:root {
	--table--border-width: 1px;
}

.table {
	width: 100%;
}

/* The last column should stretch to the table edge and have no right border. */
.table th:last-child,
.table td:last-child {
	width: 100%;
	border-right: none;
}

/* The last body row should have a darker bottom border. */
.table tbody tr:last-child th,
.table tbody tr:last-child td {
	border-bottom: var(--table--border-width) solid var(--color--gray--medium);
}

/* Truncated tables don't wrap table body contents. */
.table.truncate tbody td {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	max-width: 20ch;
}

.table .clickable {
	cursor: pointer;
}

.table .clickable:not(.active):hover {
	background-color: var(--color--gray--lighter);
}

.table .active {
	background-color: var(--color--blue--lighter);
}

.table tbody tr:hover {
	background-color: var(--color--gray);
}
</style>
