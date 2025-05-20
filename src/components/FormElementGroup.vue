<script setup lang="ts">
interface FormElementGroupProps {
	direction?: 'horizontal' | 'vertical';
	className?: string;
}

const { direction = 'horizontal', className = '' } =
	defineProps<FormElementGroupProps>();
</script>

<template>
	<div :class="`form-element-group ${direction} ${className}`.trim()">
		<slot></slot>
	</div>
</template>

<style>
.form-element-group {
	display: flex;
	gap: 0;
}

.form-element-group > *:is(:focus-visible, :active) {
	z-index: 1;
}

.form-element-group.horizontal {
	flex-direction: row;
}

.form-element-group.horizontal > *:first-child {
	border-top-right-radius: 0;
	border-bottom-right-radius: 0;
}

.form-element-group.horizontal > *:not(:first-child, :last-child) {
	border-radius: 0;
}

.form-element-group.horizontal > *:not(:first-child) {
	border-left: 0;
}

.form-element-group.horizontal > *:last-child {
	border-top-left-radius: 0;
	border-bottom-left-radius: 0;
}

.form-element-group.vertical {
	flex-direction: column;
}

.form-element-group.vertical > *:first-child {
	border-bottom-left-radius: 0;
	border-bottom-right-radius: 0;
}

.form-element-group.vertical > *:not(:first-child, :last-child) {
	border-radius: 0;
}

.form-element-group.vertical > *:not(:first-child) {
	border-top: 0;
}

.form-element-group.vertical > *:last-child {
	border-top-left-radius: 0;
	border-top-right-radius: 0;
}
</style>
