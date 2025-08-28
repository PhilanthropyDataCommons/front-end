<script setup lang="ts">
export interface TableHeadProps {
	className?: string;
	fixed?: boolean;
}

const { className = '', fixed = false } = defineProps<TableHeadProps>();
</script>

<template>
	<thead :class="`${fixed ? 'fixed' : ''} ${className}`.trim()">
		<slot> </slot>
	</thead>
</template>

<style scoped>
thead {
	background-color: var(--color--gray--light);
}
thead.fixed {
	position: sticky;
	top: 0;
}
</style>
