<script setup lang="ts">
export interface ColumnActionProps {
	className?: string;
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

<style>
.column-action {
	all: unset;

	display: flex;
	align-items: center;
	cursor: pointer;
}

.column-action .icon {
	width: var(--icon-size--text);
	height: var(--icon-size--text);
}
</style>
