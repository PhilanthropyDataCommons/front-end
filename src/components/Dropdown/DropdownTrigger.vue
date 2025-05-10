<script setup lang="ts">
interface DropdownTriggerProps {
	type?: 'button' | 'navbar-item';
}

const { type = 'button' } = defineProps<DropdownTriggerProps>();

let typeClassName = '';

switch (type) {
	case 'navbar-item':
		typeClassName = 'App-navbar__item';
		break;
	case 'button':
		typeClassName = 'button button--bordered';
		break;
	default:
}
</script>

<template>
	<summary :class="`dropdown-trigger ${typeClassName}`.trim()">
		<slot></slot>
	</summary>
</template>
