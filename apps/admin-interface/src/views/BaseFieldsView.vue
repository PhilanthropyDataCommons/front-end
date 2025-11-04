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
	useTableSort,
} from '@pdc/components';
import { RouterLink } from 'vue-router';
import { PlusIcon, PencilSquareIcon } from '@heroicons/vue/24/outline';
import { onMounted, ref } from 'vue';
import { useBaseFields } from '../pdc-api';
import { getLogger } from '@pdc/utilities';
import type { BaseField } from '@pdc/sdk';

const logger = getLogger('<BaseFieldsView>');

const { data: baseFields, fetchData: fetchBaseFields } = useBaseFields();
const isLoading = ref(true);
const caughtError = ref(false);
const baseFieldsArray = ref<BaseField[]>([]);

onMounted(async () => {
	try {
		await fetchBaseFields();
		baseFieldsArray.value = baseFields.value ?? [];
	} catch (error: unknown) {
		logger.error({ error }, 'Failed to load basefields');
		caughtError.value = true;
	} finally {
		isLoading.value = false;
	}
});

const { sortedData, handleSort, getSortDirection } = useTableSort(
	baseFieldsArray,
	'createdAt',
	'asc',
);
</script>

<template>
	<PanelComponent>
		<PanelHeader>
			<h1>Base fields</h1>
			<PanelHeaderActionsWrapper>
				<PanelHeaderAction>
					<PlusIcon class="icon" />
					<RouterLink to="/basefields/add">New base field</RouterLink>
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
						<TableColumnHead
							sortable
							:sortDirection="getSortDirection('label')"
							:onSort="() => handleSort('label')"
						>
							Label
						</TableColumnHead>
						<TableColumnHead
							sortable
							:sortDirection="getSortDirection('description')"
							:onSort="() => handleSort('description')"
						>
							Description
						</TableColumnHead>
						<TableColumnHead
							sortable
							:sortDirection="getSortDirection('shortCode')"
							:onSort="() => handleSort('shortCode')"
						>
							Short code
						</TableColumnHead>
						<TableColumnHead
							sortable
							:sortDirection="getSortDirection('dataType')"
							:onSort="() => handleSort('dataType')"
						>
							Data type
						</TableColumnHead>
						<TableColumnHead
							sortable
							:sortDirection="getSortDirection('category')"
							:onSort="() => handleSort('category')"
						>
							Category
						</TableColumnHead>
						<TableColumnHead
							sortable
							:sortDirection="getSortDirection('valueRelevanceHours')"
							:onSort="() => handleSort('valueRelevanceHours')"
						>
							Relevance Duration (hours)
						</TableColumnHead>
						<TableColumnHead></TableColumnHead>
					</TableRow>
				</TableHead>
				<TableBody>
					<TableRow v-for="baseField in sortedData" :key="baseField.shortCode">
						<TableRowCell>{{ baseField.label }}</TableRowCell>
						<TableRowCell>{{ baseField.description }}</TableRowCell>
						<TableRowCell>{{ baseField.shortCode }}</TableRowCell>
						<TableRowCell>{{ baseField.dataType }}</TableRowCell>
						<TableRowCell>{{ baseField.category }}</TableRowCell>
						<TableRowCell>{{ baseField.valueRelevanceHours }}</TableRowCell>
						<TableRowCell class="pencil-icon">
							<RouterLink :to="`/basefields/${baseField.shortCode}`">
								<PencilSquareIcon class="icon text-black" />
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

.pencil-icon {
	padding-left: 100px;
}
</style>
