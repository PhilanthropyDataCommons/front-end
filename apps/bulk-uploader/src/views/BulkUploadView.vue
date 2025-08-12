<script setup lang="ts">
import {
	PanelComponent,
	PanelBody,
	PanelHeader,
	PanelHeaderAction,
	PanelHeaderActionsWrapper,
	DataUploadComponent,
	PanelSection,
	FileUploadInput,
	DataSubmissionInput,
} from '@pdc/components';
import BulkUploadStatus from '@/components/BulkUploadStatus.vue';
import { RouterLink } from 'vue-router';
import { ArrowLeftIcon, DocumentPlusIcon } from '@heroicons/vue/24/outline';
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { useBulkUploads } from '../pdc-api';
import { useRoute } from 'vue-router';
import { BulkUploadTask } from '@pdc/sdk';

const route = useRoute();
const bulkUploadId = route.params.id;
const bulkUpload = ref<BulkUploadTask | undefined>(undefined);
const { data: bulkUploads, fetchData: fetchBulkUploads } = useBulkUploads();
let pollInterval: any = null;

const startPolling = () => {
	if (pollInterval) clearInterval(pollInterval);
	pollInterval = setInterval(async () => {
		if (bulkUpload.value?.status === 'in_progress') {
			try {
				await fetchBulkUploads();
				bulkUpload.value = bulkUploads.value?.entries.find(
					(upload) => upload.id === Number(bulkUploadId),
				);
			} catch (error) {
				console.error('Failed to poll bulk upload:', error);
			}
		} else {
			stopPolling();
		}
	}, 2000);
};

const stopPolling = () => {
	if (pollInterval) {
		clearInterval(pollInterval);
		pollInterval = null;
	}
};

onMounted(async () => {
	await fetchBulkUploads();
	bulkUpload.value = bulkUploads.value?.entries.find(
		(upload) => upload.id === Number(bulkUploadId),
	);

	if (bulkUpload.value?.status === 'in_progress') {
		startPolling();
	}
});

onUnmounted(() => {
	stopPolling();
});
</script>

<template>
	<PanelComponent padded v-if="bulkUpload">
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
		<PanelBody dataPanel>
			<PanelSection>
				<template #header>
					<h3 class="font-medium">Upload Details</h3>
				</template>
				<template #content>
					<div>
						<div>
							<h4 class="font-medium">Original File</h4>
							<div class="file-download">
								<DocumentPlusIcon class="icon" />
								<a :href="bulkUpload.fileName" target="_blank">{{
									bulkUpload.fileName
								}}</a>
							</div>
							<p class="text-color-gray-medium-dark">
								If the uploader chose any associated entities, columns for those
								entities have been added to the uploaded file.
							</p>
						</div>
						<h4 class="font-medium">Job ID</h4>
						<p>{{ bulkUpload.id }}</p>
						<h4 class="font-medium">Timestamp</h4>
						<p>{{ new Date(bulkUpload.createdAt).toUTCString() }}</p>
						<h4 class="font-medium">Uploader</h4>
						<p>{{ bulkUpload.funder?.name }}</p>
					</div>
				</template>
			</PanelSection>
			<PanelSection>
				<template #header>
					<h3 class="font-medium">Result</h3>
				</template>
				<template #content>
					<div>
						<h4 class="font-medium">Upload Result</h4>
						<p><BulkUploadStatus :status="bulkUpload.status" /></p>
						<h4 class="font-medium">Error Handling</h4>
						<p>TODO: Implement</p>
						<h4 class="font-medium">Errors Encountered</h4>
						<p>TODO: Implement</p>
						<h4 class="font-medium">Proposals Added</h4>
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
</style>
