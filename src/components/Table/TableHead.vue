<script setup lang="ts">
interface TableHeadProps {
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
