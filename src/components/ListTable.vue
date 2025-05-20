<script setup lang="ts" generic="T">
import {
	ColumnHead,
	TableComponent,
	TableBody,
	TableHead,
	TableRow,
} from './Table';

interface ListTableProps<T> {
	columns: string[];
	fieldNames?: Record<string, string>;
	items: T[];
	wrap?: boolean;
}
const {
	columns,
	items,
	fieldNames = undefined,
	wrap = false,
} = defineProps<ListTableProps<T>>();
</script>

<template>
	<TableComponent :truncate="!wrap">
		<TableHead fixed>
			<TableRow>
				<ColumnHead v-for="shortCode in columns" :key="shortCode">
					{{ fieldNames ? fieldNames[shortCode] : shortCode }}
				</ColumnHead>
			</TableRow>
		</TableHead>
		<TableBody><slot v-for="item in items" :item="item"></slot></TableBody>
	</TableComponent>
</template>
