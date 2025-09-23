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
import { RouterLink } from 'vue-router';
import { PlusIcon } from '@heroicons/vue/24/outline';
import { ArrowRightIcon } from '@heroicons/vue/24/solid';
import { onMounted, ref } from 'vue';
import { useBaseFields } from '../pdc-api';
import { getLogger } from '@pdc/utilities';

const logger = getLogger('<BaseFieldsView>');

const { data: baseFields, fetchData: fetchBaseFields } = useBaseFields();
const isLoading = ref(true);
const caughtError = ref(false);

onMounted(async () => {
	try {
		await fetchBaseFields();
	} catch (error: unknown) {
		logger.error({ error }, 'Failed to load basefields');
		caughtError.value = true;
	} finally {
		isLoading.value = false;
	}
});
</script>

<template>
	<PanelComponent>
		<PanelHeader>
			<h1>Base fields</h1>
			<PanelHeaderActionsWrapper>
				<PanelHeaderAction>
					<PlusIcon class="icon" />
					<RouterLink to="/add-data">New base field</RouterLink>
				</PanelHeaderAction>
			</PanelHeaderActionsWrapper>
		</PanelHeader>
		<PanelBody>
			<div v-if="caughtError">
				<p>Error loading base fields</p>
			</div>
			<div
				v-if="isLoading && !caughtError"
				class="text-center py-8 text-gray-500"
			>
				<p>Loading base fields...</p>
			</div>

			<TableComponent
				v-else-if="baseFields && baseFields.length > 0 && !caughtError"
				truncate
			>
				<TableHead fixed>
					<TableRow>
						<TableColumnHead>Label</TableColumnHead>
						<TableColumnHead>Description</TableColumnHead>
						<TableColumnHead>Short code</TableColumnHead>
						<TableColumnHead>Data type</TableColumnHead>
						<TableColumnHead>Category</TableColumnHead>
						<TableColumnHead>Relevance Duration</TableColumnHead>
						<TableColumnHead></TableColumnHead>
					</TableRow>
				</TableHead>
				<TableBody>
					<TableRow v-for="baseField in baseFields" :key="baseField.shortCode">
						<TableRowCell>{{ baseField.label }}</TableRowCell>
						<TableRowCell>{{ baseField.description }}</TableRowCell>
						<TableRowCell>{{ baseField.shortCode }}</TableRowCell>
						<TableRowCell>{{ baseField.dataType }}</TableRowCell>
						<TableRowCell>{{ baseField.category }}</TableRowCell>
						<TableRowCell>{{ baseField.valueRelevanceHours }}</TableRowCell>
						<TableRowCell class="arrow-icon">
							<RouterLink :to="`/basefields/`">
								<ArrowRightIcon class="icon text-black" />
							</RouterLink>
						</TableRowCell>
					</TableRow>
				</TableBody>
			</TableComponent>

			<div v-else-if="!caughtError">
				<p>No base fields found</p>
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

.arrow-icon {
	padding-left: 100px;
}
</style>
