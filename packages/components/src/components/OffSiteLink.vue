<script setup lang="ts">
export interface OffsiteLinkProps {
	/**
	 * Destination URL.
	 */
	to: string;
	/**
	 * If true, will open the destination in a new window/tab
	 * and will add the `rel="noopener noreferrer"` guardrails.
	 */
	targetBlank?: boolean;
}

const { to, targetBlank = false } = defineProps<OffsiteLinkProps>();
</script>

<template>
	<a
		:href="to"
		:target="targetBlank ? '_blank' : undefined"
		:rel="targetBlank ? 'noopener noreferrer' : undefined"
	>
		<slot v-if="$slots.default"></slot>
		<span v-else>{{ to }}</span>
	</a>
</template>
