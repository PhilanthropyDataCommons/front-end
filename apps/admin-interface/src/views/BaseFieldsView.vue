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
import { RouterLink } from 'vue-router';
import { PlusIcon } from '@heroicons/vue/24/outline';
import { onMounted, ref, computed, h } from 'vue';
import { useBaseFields } from '../pdc-api';
import { getLogger, dateCompare } from '@pdc/utilities';
import type { BaseField } from '@pdc/sdk';

const logger = getLogger('<BaseFieldsView>');

const { data: baseFields, fetchData: fetchBaseFields } = useBaseFields();
const isLoading = ref(true);
const caughtError = ref(false);

const baseFieldsArray = computed(() => {
	if (baseFields.value === null) return [];
	return [...baseFields.value].sort((a, b) =>
		dateCompare(a.createdAt, b.createdAt),
	);
});

const columnHelper = createColumnHelper<BaseField>();

const columns = [
	columnHelper.text('label', 'Label'),
	columnHelper.text('description', 'Description'),
	columnHelper.text('shortCode', 'Short code'),
	columnHelper.text('dataType', 'Data type'),
	columnHelper.text('category', 'Category'),
	columnHelper.text('valueRelevanceHours', 'Relevance Duration (hours)', {
		cell: (info) => String(info.getValue()),
	}),
	columnHelper.icon('edit', '', (row) =>
		h(EditIconLink, { to: `/basefields/${row.shortCode}` }, 'Edit'),
	),
];

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

			<DataTable
				v-else-if="baseFieldsArray.length > 0 && !caughtError"
				:data="baseFieldsArray"
				:columns="columns"
				:truncate="true"
				:enable-column-resizing="true"
			/>

			<div v-else-if="!caughtError">
				<p>No base fields found</p>
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
