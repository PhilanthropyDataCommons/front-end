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
	TableColumnHead,
	TableRowCell,
} from '@pdc/components';
import BulkUploadStatus from '../components/BulkUploadStatus.vue';
import { RouterLink } from 'vue-router';
import { PlusIcon, PencilSquareIcon } from '@heroicons/vue/24/outline';
import { onMounted, ref } from 'vue';
import { useBulkUploads } from '../pdc-api';
import { getLogger, localizeDateTime } from '@pdc/utilities';

const logger = getLogger('<BulkUploadsView>');

const { data: bulkUploads, fetchData: fetchBulkUploads } = useBulkUploads();
const isLoading = ref(true);
const caughtError = ref(false);

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

			<TableComponent
				v-else-if="
					bulkUploads && bulkUploads.entries.length > 0 && !caughtError
				"
			>
				<TableHead fixed>
					<TableRow>
						<TableColumnHead>ID</TableColumnHead>
						<TableColumnHead>Timestamp</TableColumnHead>
						<TableColumnHead>Uploader</TableColumnHead>
						<TableColumnHead>Records added</TableColumnHead>
						<TableColumnHead>Result</TableColumnHead>
						<TableColumnHead></TableColumnHead>
					</TableRow>
				</TableHead>
				<TableBody>
					<TableRow v-for="upload in bulkUploads.entries" :key="upload.id">
						<TableRowCell>{{ upload.id }}</TableRowCell>
						<TableRowCell>{{
							localizeDateTime(upload.createdAt)
						}}</TableRowCell>
						<TableRowCell>{{
							upload.createdByUser.keycloakUserName
						}}</TableRowCell>
						<TableRowCell>TBD</TableRowCell>
						<TableRowCell>
							<BulkUploadStatus :status="upload.status"
						/></TableRowCell>
						<TableRowCell class="pencil-icon">
							<RouterLink :to="`/bulk-uploads/${upload.id}`">
								<PencilSquareIcon class="icon text-black" />
							</RouterLink>
						</TableRowCell>
					</TableRow>
				</TableBody>
			</TableComponent>

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

/* Override table cell width restrictions to fit content */
:deep(.table td) {
	white-space: nowrap;
	width: auto;
}

:deep(.table td:last-child) {
	width: auto;
}

.pencil-icon {
	padding-left: 100px;
}
</style>
