<script setup lang="ts">
import {
	PanelComponent,
	PanelHeader,
	PanelBody,
	TableComponent,
	TableHead,
	TableRow,
	TableBody,
	TableColumnHead,
	TableRowCell,
} from '@pdc/components';
import { BaseField } from '@pdc/sdk';
import { computed } from 'vue';

export interface BaseFieldsTableProps {
	baseFields: BaseField[] | null;
	isLoading: boolean;
}

const props = defineProps<BaseFieldsTableProps>();

const publicBaseFields = computed(() =>
	props.baseFields?.filter(
		(baseField) =>
			baseField.sensitivityClassification ===
			BaseField.SensitivityClassificationEnum.Public,
	),
);
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

			<TableComponent
				v-else-if="props.baseFields && props.baseFields.length > 0"
				truncate
			>
				<TableHead fixed>
					<TableRow>
						<TableColumnHead>Label</TableColumnHead>
						<TableColumnHead>Description</TableColumnHead>
						<TableColumnHead>Short code</TableColumnHead>
						<TableColumnHead>Data type</TableColumnHead>
						<TableColumnHead>Category</TableColumnHead>
					</TableRow>
				</TableHead>
				<TableBody>
					<TableRow
						v-for="baseField in publicBaseFields"
						:key="baseField.label"
					>
						<TableRowCell>{{ baseField.label }}</TableRowCell>
						<TableRowCell>{{ baseField.description }}</TableRowCell>
						<TableRowCell>{{ baseField.shortCode }}</TableRowCell>
						<TableRowCell>{{ baseField.dataType }}</TableRowCell>
						<TableRowCell>{{ baseField.category }}</TableRowCell>
					</TableRow>
				</TableBody>
			</TableComponent>

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
