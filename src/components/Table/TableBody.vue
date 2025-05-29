<script setup lang="ts">
interface TableBodyProps {
	className?: string;
}

const { className = '' } = defineProps<TableBodyProps>();
</script>

<template>
	<tbody :class="className">
		<slot> </slot>
	</tbody>
</template>
