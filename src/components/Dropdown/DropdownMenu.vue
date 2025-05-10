<script setup lang="ts">
interface DropdownMenuProps {
	align?: 'left' | 'right';
}
const props = defineProps<DropdownMenuProps>();
</script>

<template>
	<div :class="`dropdown-menu ${props.align}`" ><slot></slot></div>
</template>
