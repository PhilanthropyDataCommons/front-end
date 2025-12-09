<script setup lang="ts">
import {
	PanelComponent,
	PanelBody,
	PanelHeader,
	PanelHeaderAction,
	PanelHeaderActionsWrapper,
	DataTable,
	textColumn,
	linkIconColumn,
} from '@pdc/components';
import BulkUploadStatus from '../components/BulkUploadStatus.vue';
import { RouterLink } from 'vue-router';
import { PlusIcon, PencilSquareIcon } from '@heroicons/vue/24/outline';
import { onMounted, ref, computed, h } from 'vue';
import { useBulkUploads } from '../pdc-api';
import { getLogger, localizeDateTime } from '@pdc/utilities';
import type { BulkUploadTask } from '@pdc/sdk';
import type { ColumnDef } from '@tanstack/vue-table';

const logger = getLogger('<BulkUploadsView>');

const { data: bulkUploads, fetchData: fetchBulkUploads } = useBulkUploads();
const isLoading = ref(true);
const caughtError = ref(false);

const bulkUploadsArray = computed(() => bulkUploads.value?.entries ?? []);

const columns: Array<ColumnDef<BulkUploadTask>> = [
	textColumn<BulkUploadTask>('id', 'ID'),
	{
		accessorKey: 'createdAt',
		header: 'Timestamp',
		// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- createdAt is known to be a string from the API
		cell: (info) => localizeDateTime(info.getValue() as string),
	},
	{
		accessorKey: 'createdByUser',
		header: 'Uploader',
		cell: (info) =>
			// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- createdByUser structure is known from the API
			(info.getValue() as { keycloakUserName: string }).keycloakUserName,
	},
	{
		id: 'recordsAdded',
		header: 'Records added',
		cell: () => 'TBD',
		enableSorting: false,
	},
	{
		accessorKey: 'status',
		header: 'Result',
		cell: (info) =>
			h(BulkUploadStatus, {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- status is known to be StatusEnum from the API
				status: info.getValue() as BulkUploadTask['status'],
			}),
		enableSorting: true,
	},
	linkIconColumn<BulkUploadTask>('edit', '', {
		to: (row) => `/bulk-uploads/${row.id}`,
		icon: PencilSquareIcon,
		linkClass: 'pencil-icon',
		iconClass: 'icon text-black',
	}),
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
			/>

			<div v-else-if="!caughtError">
				<p>No bulk uploads found</p>
			</div>
		</PanelBody>
	</PanelComponent>
</template>

<style scoped>
.text-black {
	color: var(--color--black);
}

:deep(.pencil-icon) {
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
