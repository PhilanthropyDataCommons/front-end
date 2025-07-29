<script setup lang="ts">
interface DropdownMenuProps {
	align?: 'left' | 'right';
}
const { align = 'left' } = defineProps<DropdownMenuProps>();
</script>

<template>
	<div :class="`dropdown-menu ${align}`"><slot></slot></div>
</template>
