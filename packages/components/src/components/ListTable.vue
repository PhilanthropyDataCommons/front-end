<template>
	<TableComponent :truncate="!wrap">
		<TableHead fixed>
			<TableRow>
				<ColumnHead v-for="column in columns" :key="column">
					{{ fieldNames?.[column] ?? column }}
				</ColumnHead>
			</TableRow>
		</TableHead>
		<TableBody>
			<template v-for="(item, index) in items" :key="index">
				<component :is="renderItem(item)" />
			</template>
		</TableBody>
	</TableComponent>
</template>

<script setup lang="ts" generic="T">
import {
	TableComponent,
	TableHead,
	TableBody,
	TableRow,
	ColumnHead,
} from './Table';

export interface ListTableProps<T> {
	columns: string[];
	fieldNames?: Record<string, string>;
	items: T[];
	wrap?: boolean;
	renderItem: (item: T) => any;
}

const {
	fieldNames,
	columns,
	items,
	renderItem,
	wrap = false,
} = defineProps<ListTableProps<T>>();

	console.log(items);

</script>
