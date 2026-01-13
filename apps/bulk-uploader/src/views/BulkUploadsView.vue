<script setup lang="tsx">
import {
	PanelComponent,
	PanelBody,
	PanelHeader,
	PanelHeaderAction,
	PanelHeaderActionsWrapper,
	DataTable,
	EditIconLink,
	createColumnHelper,
} from '@pdc/components';
import BulkUploadStatus from '../components/BulkUploadStatus.vue';
import { RouterLink } from 'vue-router';
import { PlusIcon } from '@heroicons/vue/24/outline';
import { onMounted, ref, computed, h } from 'vue';
import { useBulkUploads } from '../pdc-api';
import { getLogger, localizeDateTime } from '@pdc/utilities';
import type { BulkUploadTask } from '@pdc/sdk';

const logger = getLogger('<BulkUploadsView>');

const { data: bulkUploads, fetchData: fetchBulkUploads } = useBulkUploads();
const isLoading = ref(true);
const caughtError = ref(false);

const bulkUploadsArray = computed(() => bulkUploads.value?.entries ?? []);

const columnHelper = createColumnHelper<BulkUploadTask>();

const columns = [
	columnHelper.text('id', 'ID'),
	columnHelper.text('createdAt', 'Timestamp', {
		cell: (info) => localizeDateTime(info.getValue()),
	}),
	columnHelper.text('createdByUser', 'Uploader', {
		cell: (info) => info.getValue().keycloakUserName ?? '',
	}),
	columnHelper.display('recordsAdded', 'Records added', {
		cell: () => 'TBD',
		enableSorting: false,
	}),
	columnHelper.accessor('status', 'Result', {
		cell: (info) => h(BulkUploadStatus, { status: info.getValue() }),
	}),
	columnHelper.icon('edit', '', (row) =>
		h(EditIconLink, { to: `/bulk-uploads/${row.id}` }),
	),
];

onMounted(async () => {
	try {
		await Promise.all([fetchBulkUploads()]);
	} catch (error: unknown) {
		if (error instanceof Error) {
			logger.error({ error }, `Failed to load data: ${error.message}`);
		}
		caughtError.value = true;
	} finally {
		isLoading.value = false;
	}
});
</script>

<template>
	<PanelComponent>
		<PanelHeader>
			<h1>Bulk Uploads</h1>
			<PanelHeaderActionsWrapper>
				<PanelHeaderAction>
					<PlusIcon class="icon" />
					<RouterLink to="/add-data">New bulk upload</RouterLink>
				</PanelHeaderAction>
			</PanelHeaderActionsWrapper>
		</PanelHeader>
		<PanelBody>
			<div v-if="caughtError">
				<p>Error loading bulk uploads</p>
			</div>
			<div
				v-if="isLoading && !caughtError"
				class="text-center py-8 text-gray-500"
			>
				<p>Loading bulk uploads...</p>
			</div>

			<DataTable
				v-else-if="bulkUploadsArray.length > 0 && !caughtError"
				:data="bulkUploadsArray"
				:columns="columns"
				:enable-column-resizing="true"
			/>

			<div v-else-if="!caughtError">
				<p>No bulk uploads found</p>
			</div>
		</PanelBody>
	</PanelComponent>
</template>

<style scoped>
:deep(.pencil-icon) {
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
