<template>
	<div v-if="status === 'completed'" class="status-success">
		<CheckIcon class="status-icon" />
		<span>Success</span>
	</div>
	<div v-else-if="status === 'failed'" class="status-failure">
		<XCircleIcon class="status-icon" />
		<span>Failure</span>
	</div>
	<div v-else class="status-default">
		{{ status }}
	</div>
</template>

<script setup lang="ts">
import type { BulkUploadTask } from '@pdc/sdk';
import { XCircleIcon, CheckIcon } from '@heroicons/vue/24/solid';

const { status } = defineProps<{
	status: BulkUploadTask['status'];
}>();
</script>

<style scoped>
.status-success {
	display: flex;
	align-items: center;
	color: var(--color--green);
}

.status-failure {
	display: flex;
	align-items: center;
	color: var(--color--red--dark);
}

.status-icon {
	width: 16px;
	height: 16px;
	margin-right: 4px;
}
</style>
