<script setup lang="ts">
interface RowHeadProps {
	className?: string;
}

const { className = '' } = defineProps<RowHeadProps>();
</script>

<template>
	<th :class="`${className}`">
		<slot> </slot>
	</th>
</template>
