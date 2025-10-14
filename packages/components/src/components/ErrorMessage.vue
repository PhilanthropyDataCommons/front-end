<script setup lang="ts">
import { XCircleIcon } from '@heroicons/vue/24/outline';

defineProps<{
	message: string;
	mode?: 'json';
}>();
</script>

<template>
	<div class="error-container">
		<div v-if="mode === 'json'">
			<div class="error-header">
				<XCircleIcon class="icon" />
				<p>Error</p>
			</div>
			<pre class="error-message">{{ message }}</pre>
		</div>
		<div v-else class="error-simple">
			<XCircleIcon class="icon" />
			<p>{{ message }}</p>
		</div>
	</div>
</template>

<style scoped>
.error-container {
	color: var(--color--red--dark);
}

.error-header {
	display: flex;
	align-items: center;
	gap: 0.5rem;
	font-size: 1.25rem;
}

.error-simple {
	display: flex;
	align-items: center;
	gap: 0.5rem;
}

.error-simple p {
	margin: 0;
}

.error-message {
	word-wrap: break-word;
	overflow-wrap: break-word;
	white-space: pre-wrap;
	font-family: inherit;
}
</style>
