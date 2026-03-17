<script setup lang="ts">
import { InformationCircleIcon } from '@heroicons/vue/24/outline';

withDefaults(
	defineProps<{
		backgroundColor?: string;
		textColor?: string;
	}>(),
	{
		backgroundColor: '#f0f0f0',
		textColor: '#222',
	},
);
</script>

<template>
	<div class="info-block" :style="{ backgroundColor, color: textColor }">
		<InformationCircleIcon class="icon" />
		<span><slot /></span>
	</div>
</template>

<style scoped>
.info-block {
	display: inline-flex;
	align-items: flex-start;
	gap: var(--fixed-spacing--1x);
	padding: var(--fixed-spacing--1x) var(--fixed-spacing--1x);
	border-radius: var(--fixed-spacing--halfx);
	width: fit-content;
	margin-top: var(--fixed-spacing--1x);
}

.icon {
	flex-shrink: 0;
	width: 1.25rem;
	height: 1.25rem;
	margin-top: 0.1em;
}
</style>
