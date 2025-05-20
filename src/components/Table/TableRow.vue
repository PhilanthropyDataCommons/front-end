<script setup lang="ts">
interface TableRowProps {
	className?: string;
	onClick?: () => void;
	active?: boolean;
}

const {
	className = '',
	onClick = undefined,
	active = false,
} = defineProps<TableRowProps>();
</script>

<template>
	<tr
		:class="
			`${className} ${onClick ? 'clickable' : ''} ${active ? 'active' : ''}`.trim()
		"
		@click="onClick"
	>
		<slot> </slot>
	</tr>
</template>
