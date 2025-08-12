<script setup lang="ts">
import {
	PanelComponent,
	PanelBody,
	PanelHeader,
	PanelHeaderAction,
	PanelHeaderActionsWrapper,
	TableComponent,
	TableHead,
	TableBody,
	TableRow,
	ColumnHead,
	RowCell,
} from '@pdc/components';
import BulkUploadStatus from '@/components/BulkUploadStatus.vue';
import { RouterLink } from 'vue-router';
import { PlusIcon } from '@heroicons/vue/24/outline';
import { ArrowLongRightIcon } from '@heroicons/vue/24/solid';
import { onMounted, ref } from 'vue';
import { useBulkUploads } from '../pdc-api';

const { data: bulkUploads, fetchData: fetchBulkUploads } = useBulkUploads();
const isLoading = ref(true);

onMounted(async () => {
	try {
		await fetchBulkUploads();
		console.log('Bulk uploads loaded:', bulkUploads.value);
	} catch (error) {
		console.error('Failed to load bulk uploads:', error);
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
		<PanelBody :padded="false">
			<div v-if="isLoading" class="text-center py-8 text-gray-500">
				<p>Loading bulk uploads...</p>
			</div>

			<TableComponent v-else-if="bulkUploads && bulkUploads.entries.length > 0">
				<TableHead fixed>
					<TableRow>
						<ColumnHead>ID</ColumnHead>
						<ColumnHead>Timestamp</ColumnHead>
						<ColumnHead>Uploader</ColumnHead>
						<ColumnHead>Records added</ColumnHead>
						<ColumnHead>Result</ColumnHead>
						<ColumnHead></ColumnHead>
					</TableRow>
				</TableHead>
				<TableBody>
					<TableRow v-for="upload in bulkUploads.entries" :key="upload.id">
						<RowCell>{{ upload.id }}</RowCell>
						<RowCell>{{ new Date(upload.createdAt).toUTCString() }}</RowCell>
						<RowCell>{{ upload.funder?.name }}</RowCell>
						<RowCell>TBD</RowCell>
						<RowCell> <BulkUploadStatus :status="upload.status" /></RowCell>
						<RowCell>
							<RouterLink :to="`/bulk-uploads/${upload.id}`">
								<ArrowLongRightIcon class="icon black" />
							</RouterLink>
						</RowCell>
					</TableRow>
				</TableBody>
			</TableComponent>

			<div v-else>
				<p>No bulk uploads found</p>
			</div>
		</PanelBody>
	</PanelComponent>
</template>

<style scoped>
.black {
	color: black;
}

/* Override table cell width restrictions to fit content */
:deep(.table td) {
	white-space: nowrap;
	width: auto;
}

:deep(.table td:last-child) {
	width: auto;
}
</style>
