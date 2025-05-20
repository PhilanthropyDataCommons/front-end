<script setup lang="ts">
interface ColumnHeadProps {
	className?: string;
	actions?: boolean;
	actionAlignment?: 'left' | 'right';
}

const {
	className = '',
	actions = false,
	actionAlignment = 'right',
} = defineProps<ColumnHeadProps>();
</script>

<template>
	<th
		:class="
			`
    ${className}
    ${actions ? `has-actions action-alignment--${actionAlignment}` : ''}
  `.trim()
		"
	>
		<div class="column-head-wrapper">
			<slot> </slot>
		</div>
	</th>
</template>
