<script setup lang="ts" generic="TData">
import {
	useVueTable,
	getCoreRowModel,
	getSortedRowModel,
	getFilteredRowModel,
	type ColumnDef,
	type SortingState,
	type ColumnFiltersState,
	type ColumnResizeMode,
	FlexRender,
} from '@tanstack/vue-table';
import { ref, computed } from 'vue';

export interface DataTableProps<TData> {
	data: TData[];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any  -- needed to accept any column definition
	columns: Array<ColumnDef<TData, any>>;
	className?: string;
	truncate?: boolean;
	enableSorting?: boolean;
	enableFiltering?: boolean;
	enableColumnResizing?: boolean;
	columnResizeMode?: ColumnResizeMode;
}

const props = withDefaults(defineProps<DataTableProps<TData>>(), {
	className: '',
	truncate: false,
	enableSorting: true,
	enableFiltering: false,
	enableColumnResizing: false,
	columnResizeMode: 'onChange',
});

const sorting = ref<SortingState>([]);
const columnFilters = ref<ColumnFiltersState>([]);

const table = useVueTable({
	get data() {
		return props.data;
	},
	get columns() {
		return props.columns;
	},
	getCoreRowModel: getCoreRowModel(),
	getSortedRowModel: props.enableSorting ? getSortedRowModel() : undefined,
	getFilteredRowModel: props.enableFiltering
		? getFilteredRowModel()
		: undefined,
	state: {
		get sorting() {
			return sorting.value;
		},
		get columnFilters() {
			return columnFilters.value;
		},
	},
	onSortingChange: (updaterOrValue) => {
		sorting.value =
			typeof updaterOrValue === 'function'
				? updaterOrValue(sorting.value)
				: updaterOrValue;
	},
	onColumnFiltersChange: (updaterOrValue) => {
		columnFilters.value =
			typeof updaterOrValue === 'function'
				? updaterOrValue(columnFilters.value)
				: updaterOrValue;
	},
	enableSorting: props.enableSorting,
	enableColumnResizing: props.enableColumnResizing,
	columnResizeMode: props.columnResizeMode,
});

const tableClasses = computed(() =>
	`data-table ${props.truncate ? 'truncate' : ''} ${props.className}`.trim(),
);
</script>

<template>
	<table :border="0" :cellPadding="0" :cellSpacing="0" :class="tableClasses">
		<thead>
			<tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
				<th
					v-for="header in headerGroup.headers"
					:key="header.id"
					:colSpan="header.colSpan"
				>
					<div
						v-if="!header.isPlaceholder"
						:class="{
							sortable: header.column.getCanSort(),
						}"
						@click="header.column.getToggleSortingHandler()?.($event)"
					>
						<FlexRender
							:render="header.column.columnDef.header"
							:props="header.getContext()"
						/>
						<span v-if="header.column.getIsSorted()" class="sort-indicator">
							{{ header.column.getIsSorted() === 'asc' ? ' ↑' : ' ↓' }}
						</span>
					</div>
				</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="row in table.getRowModel().rows" :key="row.id">
				<td v-for="cell in row.getVisibleCells()" :key="cell.id">
					<FlexRender
						:render="cell.column.columnDef.cell"
						:props="cell.getContext()"
					/>
				</td>
			</tr>
		</tbody>
	</table>
</template>

<style>
:root {
	--table--border-width: 1px;
}

.data-table {
	width: 100%;
}

.data-table th {
	min-width: 25%;
	vertical-align: bottom;
	white-space: nowrap;
	text-align: left;
	padding: var(--accessible-spacing--1x);
	border-bottom: var(--table--border-width) solid var(--color--gray--light);
	background-color: var(--color--gray--light);
}

.data-table td {
	vertical-align: top;
	padding: var(--accessible-spacing--1x);
	border-bottom: var(--table--border-width) solid var(--color--gray--light);
}

/* The last column should stretch to the table edge and have no right border. */
.data-table th:last-child,
.data-table td:last-child {
	width: 100%;
	border-right: none;
}

/* The last body row should have a darker bottom border. */
.data-table tbody tr:last-child th,
.data-table tbody tr:last-child td {
	border-bottom: var(--table--border-width) solid var(--color--gray--medium);
}

/* Truncated tables don't wrap table body contents. */
.data-table.truncate tbody td {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	max-width: 20ch;
}

.data-table tbody tr:hover {
	background-color: var(--color--gray);
}

/* Sortable column headers */
.data-table .sortable {
	cursor: pointer;
	user-select: none;
	display: inline-block;
}

.data-table .sortable:hover {
	opacity: 0.7;
}

.data-table .sort-indicator {
	display: inline-block;
	margin-left: 0.25rem;
	font-size: 0.875em;
}

/* Icon link column styles */
.data-table .icon-link,
.data-table .pencil-icon {
	color: inherit;
	text-decoration: none;
	padding-left: 50px;
}

.data-table .icon-link:visited,
.data-table .pencil-icon:visited {
	color: inherit;
}

.data-table .icon-link:hover,
.data-table .pencil-icon:hover {
	color: inherit;
}

.data-table a {
	color: inherit;
	text-decoration: none;
}

.data-table a:visited {
	color: inherit;
}

.data-table a:hover {
	color: inherit;
}
</style>
