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
import { RouterLink } from 'vue-router';
import { PlusIcon, PencilSquareIcon } from '@heroicons/vue/24/outline';
import { onMounted, ref, computed } from 'vue';
import { useBaseFields } from '../pdc-api';
import { getLogger, dateCompare } from '@pdc/utilities';
import type { BaseField } from '@pdc/sdk';
import type { ColumnDef } from '@tanstack/vue-table';

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

const columns: Array<ColumnDef<BaseField>> = [
	textColumn<BaseField>('label', 'Label'),
	textColumn<BaseField>('description', 'Description'),
	textColumn<BaseField>('shortCode', 'Short code'),
	textColumn<BaseField>('dataType', 'Data type'),
	textColumn<BaseField>('category', 'Category'),
	{
		accessorKey: 'valueRelevanceHours',
		header: 'Relevance Duration (hours)',
		// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- valueRelevanceHours is known to be a number from the API
		cell: (info) => String(info.getValue() as number),
	},
	linkIconColumn<BaseField>('edit', '', {
		to: (row) => `/basefields/${row.shortCode}`,
		icon: PencilSquareIcon,
		linkClass: 'pencil-icon',
		iconClass: 'icon text-black',
	}),
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
			/>

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

:deep(.pencil-icon) {
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
