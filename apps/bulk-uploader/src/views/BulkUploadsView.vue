<script setup lang="ts">
import {
	PanelComponent,
	PanelBody,
	PanelHeader,
	PanelHeaderAction,
	PanelHeaderActionsWrapper,
	ListTable,
	TableRow,
	RowHead,
	RowCell,
} from '@pdc/components';
import { RouterLink } from 'vue-router';
import { PlusIcon } from '@heroicons/vue/24/outline';
import { onMounted, h } from 'vue';
import { useBulkUploads } from '../pdc-api';
import type { BulkUploadTask } from '@pdc/sdk';

const { data: bulkUploads, fetchData: fetchBulkUploads } = useBulkUploads();

onMounted(async () => {
	await fetchBulkUploads();
	console.log(bulkUploads.value);
});

// Define columns to display
const columns = ['fileName', 'status', 'createdAt', 'createdBy'];

const fieldNames = {
	fileName: 'File Name',
	status: 'Status',
	createdAt: 'Created At',
	createdBy: 'Created By',
};

// Render function for each bulk upload row
const renderBulkUpload = (upload: BulkUploadTask) => {
	return h(TableRow, { key: upload.id }, [
		h(RowHead, upload.fileName),
		h(RowCell, upload.status),
		h(RowCell, new Date(upload.createdAt).toLocaleDateString()),
		h(RowCell, upload.createdBy),
	]);
};
</script>

<template>
	<PanelComponent padded>
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
			<ListTable
				v-if="bulkUploads"
				:columns="columns"
				:field-names="fieldNames"
				:items="bulkUploads"
				:render-item="renderBulkUpload"
				:wrap="false"
			/>
		</PanelBody>
	</PanelComponent>
</template>

<style></style>
