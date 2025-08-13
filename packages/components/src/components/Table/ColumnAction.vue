<script setup lang="ts">
interface ColumnActionProps {
	className?: string;
	title?: string;
	onClick?: () => void;
}

const { className = '', onClick = () => null } =
	defineProps<ColumnActionProps>();
</script>

<template>
	<button
		type="button"
		:class="`column-action ${className}`.trim()"
		@click="onClick"
	>
		<slot> </slot>
	</button>
</template>
