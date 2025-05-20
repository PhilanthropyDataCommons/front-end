<script setup lang="ts">
import type { BaseField } from '@pdc/sdk';
import {
	TableComponent,
	TableHead,
	ColumnHead,
	TableBody,
	TableRow,
	RowCell,
} from './Table';

interface BaseFieldsProps {
	fields: BaseField[];
}

const { fields } = defineProps<BaseFieldsProps>();
</script>

<template>
	<TableComponent>
		<TableHead fixed>
			<TableRow>
				<ColumnHead>Key</ColumnHead>
				<ColumnHead>Label</ColumnHead>
				<ColumnHead>Description</ColumnHead>
			</TableRow>
		</TableHead>
		<TableBody>
			<TableRow v-for="field in fields" :key="field.id">
				<RowCell>
					<code className="short-code">{{ field.shortCode }}</code>
				</RowCell>
				<RowCell>{{ field.label }}</RowCell>
				<RowCell>{{ field.description }}</RowCell>
			</TableRow>
		</TableBody>
	</TableComponent>
</template>
