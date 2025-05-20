<script setup lang="ts">
interface RowCellProps {
	className?: string;
	wrap?: boolean;
}

const { className = '', wrap = false } = defineProps<RowCellProps>();
</script>

<template>
	<td :class="`${wrap ? 'wrap' : ''} ${className}`.trim()">
		<slot> </slot>
	</td>
</template>
