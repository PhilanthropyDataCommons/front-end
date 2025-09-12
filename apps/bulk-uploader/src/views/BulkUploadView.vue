<script setup lang="ts">
import {
	PanelComponent,
	PanelBody,
	PanelHeader,
	PanelHeaderAction,
	PanelHeaderActionsWrapper,
	PanelSection,
} from '@pdc/components';
import BulkUploadStatus from '@/components/BulkUploadStatus.vue';
import { RouterLink, useRoute } from 'vue-router';
import { ArrowLeftIcon, DocumentPlusIcon } from '@heroicons/vue/24/outline';
import { ref, onMounted, onUnmounted } from 'vue';
import { useBulkUploads } from '../pdc-api';
import { BulkUploadTask as BulkUploadTaskType } from '@pdc/sdk';
import type { BulkUploadTask } from '@pdc/sdk';
import { getLogger, localizeDateTime } from '@pdc/utilities';

const logger = getLogger('BulkUploadView');

const { StatusEnum: BulkUploadTaskStatus } = BulkUploadTaskType;
const POLL_INTERVAL_MS = 2000;

const {
	params: { id: bulkUploadId },
} = useRoute();
const bulkUpload = ref<BulkUploadTask | undefined>(undefined);
const { data: bulkUploads, fetchData: fetchBulkUploads } = useBulkUploads();
let pollInterval: ReturnType<typeof setInterval> | null = null;

const startPolling = (): void => {
	if (pollInterval !== null) clearInterval(pollInterval);
	pollInterval = setInterval(() => {
		void (async () => {
			if (bulkUpload.value?.status === BulkUploadTaskStatus.InProgress) {
				try {
					await fetchBulkUploads();
					bulkUpload.value = bulkUploads.value?.entries.find(
						(upload) => upload.id === Number(bulkUploadId),
					);
				} catch (error) {
					logger.error({ error }, 'Error fetching bulk upload');
				}
			} else {
				stopPolling();
			}
		})();
	}, POLL_INTERVAL_MS);
};

const stopPolling = (): void => {
	if (pollInterval !== null) {
		clearInterval(pollInterval);
		pollInterval = null;
	}
};

onMounted(() => {
	void (async () => {
		await fetchBulkUploads();
		bulkUpload.value = bulkUploads.value?.entries.find(
			(upload) => upload.id === Number(bulkUploadId),
		);

		if (bulkUpload.value?.status === BulkUploadTaskStatus.InProgress) {
			startPolling();
		}
	})();
});

onUnmounted(() => {
	stopPolling();
});
</script>

<template>
	<PanelComponent v-if="bulkUpload" padded>
		<PanelHeader>
			<div class="bulk-upload-header">
				<h1>BulkUpload {{ bulkUpload.id }}</h1>
				<BulkUploadStatus :status="bulkUpload.status" />
			</div>

			<PanelHeaderActionsWrapper>
				<PanelHeaderAction>
					<ArrowLeftIcon class="icon" />
					<RouterLink to="/bulk-uploads">Back to bulk uploads</RouterLink>
				</PanelHeaderAction>
			</PanelHeaderActionsWrapper>
		</PanelHeader>
		<PanelBody variant="data-panel-padded">
			<PanelSection>
				<template #header>
					<h3>Upload Details</h3>
				</template>
				<template #content>
					<div>
						<div class="disabled">
							<h4>Original File</h4>
							<div class="file-download">
								<DocumentPlusIcon class="icon" />
								<p>TO DO: IMPLEMENT</p>
							</div>
						</div>
						<h4>Job ID</h4>
						<p>{{ bulkUpload.id }}</p>
						<h4>Timestamp</h4>
						<p>{{ localizeDateTime(bulkUpload.createdAt) }}</p>
						<h4>Uploader</h4>
						<p>{{ bulkUpload.createdBy }}</p>
					</div>
				</template>
			</PanelSection>
			<PanelSection>
				<template #header>
					<h3>Result</h3>
				</template>
				<template #content>
					<div>
						<h4>Upload Result</h4>
						<p><BulkUploadStatus :status="bulkUpload.status" /></p>
						<h4>Errors Encountered</h4>
						<p>TODO: Implement</p>
						<h4>Proposals Added</h4>
						<p>TODO: Implement</p>
					</div>
				</template>
			</PanelSection>
		</PanelBody>
	</PanelComponent>
</template>

<style scoped>
.bulk-upload-header {
	display: flex;
	align-items: center;
	gap: var(--fixed-spacing--1x);
}
.file-download {
	display: flex;
	align-items: center;
	gap: var(--fixed-spacing--1x);
	color: var(--color--blue);
}
.file-download a {
	color: var(--color--blue);
}

.disabled {
	opacity: 0.5;
	cursor: not-allowed;
}
</style>
