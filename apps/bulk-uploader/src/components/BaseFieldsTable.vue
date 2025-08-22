<script setup lang="ts">
import {
	PanelComponent,
	PanelHeader,
	PanelHeaderActionsWrapper,
	PanelHeaderAction,
	PanelBody,
	TableComponent,
	TableHead,
	TableRow,
	ColumnHead,
	TableBody,
	RowCell,
} from '@pdc/components';
import { DocumentPlusIcon } from '@heroicons/vue/24/outline';
import type { BaseField } from '@pdc/sdk';

const props = defineProps<{
	baseFields: BaseField[] | null;
	isLoading: boolean;
}>();
</script>

<template>
	<PanelComponent padded>
		<PanelHeader>
			<h1>Base Fields</h1>
			<PanelHeaderActionsWrapper class="disabled">
				<PanelHeaderAction>
					<DocumentPlusIcon class="icon" />
					<p class="download-csv-text">Download CSV template</p>
				</PanelHeaderAction>
			</PanelHeaderActionsWrapper>
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
						<ColumnHead>Label</ColumnHead>
						<ColumnHead>Description</ColumnHead>
						<ColumnHead>Short code</ColumnHead>
						<ColumnHead>Data type</ColumnHead>
						<ColumnHead>Category</ColumnHead>
					</TableRow>
				</TableHead>
				<TableBody>
					<TableRow v-for="baseField in baseFields" :key="baseField.label">
						<RowCell>{{ baseField.label }}</RowCell>
						<RowCell>{{ baseField.description }}</RowCell>
						<RowCell>{{ baseField.shortCode }}</RowCell>
						<RowCell>{{ baseField.dataType }}</RowCell>
						<RowCell>{{ baseField.category }}</RowCell>
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
