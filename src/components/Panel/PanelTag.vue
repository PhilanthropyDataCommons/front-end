<script setup lang="ts">
import type { FunctionalComponent, HTMLAttributes, VNodeProps } from 'vue';

interface PanelTagProps {
	className?: string;
	icon?: FunctionalComponent<HTMLAttributes & VNodeProps>;
	badge?: string | null;
}

const {
	className = '',
	icon = undefined,
	badge = undefined,
} = defineProps<PanelTagProps>();
</script>

<template>
	<div :class="`panel-tag ${className}`.trim()">
		<component :is="icon" v-if="icon" />
		<span v-if="badge">
			{{ badge }}
		</span>
		<slot></slot>
	</div>
</template>
