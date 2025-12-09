<script setup lang="ts">
import {
	PanelComponent,
	PanelHeader,
	PanelBody,
	DataTable,
	textColumn,
} from '@pdc/components';
import { BaseField } from '@pdc/sdk';
import { computed } from 'vue';
import type { ColumnDef } from '@tanstack/vue-table';

export interface BaseFieldsTableProps {
	baseFields: BaseField[] | null;
	isLoading: boolean;
}

const props = defineProps<BaseFieldsTableProps>();

const publicBaseFields = computed(
	() =>
		props.baseFields?.filter(
			(baseField) =>
				baseField.sensitivityClassification ===
				BaseField.SensitivityClassificationEnum.Public,
		) ?? [],
);

const columns: Array<ColumnDef<BaseField>> = [
	textColumn<BaseField>('label', 'Label'),
	textColumn<BaseField>('description', 'Description'),
	textColumn<BaseField>('shortCode', 'Short code'),
	textColumn<BaseField>('dataType', 'Data type'),
	textColumn<BaseField>('category', 'Category'),
];
</script>

<template>
	<PanelComponent padded>
		<PanelHeader>
			<h1>Base Fields</h1>
		</PanelHeader>
		<PanelBody :padded="false">
			<div v-if="isLoading" class="text-center py-8 text-gray-500">
				<p>Loading base fields...</p>
			</div>

			<DataTable
				v-else-if="publicBaseFields.length > 0"
				:data="publicBaseFields"
				:columns="columns"
				:truncate="true"
			/>

			<div v-else>
				<p>No base fields found</p>
			</div>
		</PanelBody>
	</PanelComponent>
</template>

<style scoped>
.download-csv-text {
	font-weight: 700;
}

.disabled {
	opacity: 0.5;
	cursor: not-allowed;
}
</style>
