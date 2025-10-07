<script setup lang="ts">
import { XCircleIcon } from '@heroicons/vue/24/outline';

defineProps<{
	message: string;
}>();
</script>

<template>
	<div class="error-message">
		<XCircleIcon class="icon" />
		<p>{{ message }}</p>
	</div>
</template>

<style scoped>
.error-message {
	color: var(--color--red--dark);
	display: flex;
	align-items: center;
}
</style>
