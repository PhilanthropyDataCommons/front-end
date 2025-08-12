<script setup lang="ts">
interface ColumnActionProps {
	className?: string;
	title?: string;
	onClick?: () => void;
}

const {
	className = '',
	title = '',
	onClick = () => null,
} = defineProps<ColumnActionProps>();
</script>

<template>
	<button
		type="button"
		:class="`column-action ${className}`.trim()"
		:title="title"
		@click="onClick"
	>
		<slot> </slot>
	</button>
</template>
