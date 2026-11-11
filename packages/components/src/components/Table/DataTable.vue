<script setup lang="ts" generic="TData extends RowData">
import {
	useTable,
	type ColumnDef,
	type PaginationState,
	type RowData,
	FlexRender,
} from '@tanstack/vue-table';
import { computed } from 'vue';
import CustomButton from '../CustomButton.vue';
import { dataTableFeatures, type DataTableFeatures } from './features';

export interface DataTableProps<TData extends RowData> {
	data: TData[];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any -- needed for generic column definitions
	columns: Array<ColumnDef<DataTableFeatures, TData, any>>;
	className?: string;
	truncate?: boolean;
	enableSorting?: boolean;
	enableFiltering?: boolean;
	enableColumnResizing?: boolean;
	pageSizeOptions?: number[];
	rowCount?: number;
}

const props = withDefaults(defineProps<DataTableProps<TData>>(), {
	className: '',
	truncate: false,
	enableSorting: true,
	enableFiltering: false,
	enableColumnResizing: false,
	pageSizeOptions: undefined,
	rowCount: undefined,
});

const page = defineModel<number>('page');
const pageSize = defineModel<number>('pageSize');

const FIRST_PAGE = 1;
const FIRST_ROW = 1;
const currentPage = computed(() => page.value ?? FIRST_PAGE);
const isPaginated = computed(() => pageSize.value !== undefined);

const pagination = computed<PaginationState>(() => ({
	pageIndex: currentPage.value - FIRST_PAGE,
	pageSize: pageSize.value ?? Number.MAX_SAFE_INTEGER,
}));

const table = useTable({
	features: dataTableFeatures,
	get data() {
		return props.data;
	},
	get columns() {
		return props.columns;
	},
	defaultColumn: {
		size: 120, // eslint-disable-line @typescript-eslint/no-magic-numbers -- sensible default column width
		minSize: 40, // eslint-disable-line @typescript-eslint/no-magic-numbers -- sensible minimum column width
	},
	columnResizeMode: 'onChange',
	get manualPagination() {
		return !isPaginated.value || props.rowCount !== undefined;
	},
	get rowCount() {
		return props.rowCount;
	},
	state: {
		get pagination() {
			return pagination.value;
		},
	},
	onPaginationChange: (updaterOrValue) => {
		const { pageIndex: nextPageIndex } =
			typeof updaterOrValue === 'function'
				? updaterOrValue(pagination.value)
				: updaterOrValue;
		page.value = nextPageIndex + FIRST_PAGE;
	},
	get enableSorting() {
		return props.enableSorting;
	},
	get enableColumnFilters() {
		return props.enableFiltering;
	},
	get enableColumnResizing() {
		return props.enableColumnResizing;
	},
});

const isResizing = computed(
	() => table.atoms.columnResizing.get().isResizingColumn !== false,
);

const pageCount = computed(() => Math.max(table.getPageCount(), FIRST_PAGE));

const showPagination = computed(
	() =>
		isPaginated.value &&
		(props.pageSizeOptions !== undefined ||
			table.getCanPreviousPage() ||
			table.getCanNextPage()),
);

const changePageSize = (event: Event): void => {
	const { target: select } = event;
	if (!(select instanceof HTMLSelectElement)) return;
	pageSize.value = Number(select.value);
	page.value = FIRST_PAGE;
	select.value = String(pageSize.value);
};

const rowRangeLabel = computed(() => {
	const {
		value: { pageIndex, pageSize },
	} = pagination;
	const rowsBeforePage = pageIndex * pageSize;
	const totalRows = table.getRowCount();
	const firstRow = Math.min(rowsBeforePage + FIRST_ROW, totalRows);
	const lastRow = Math.min(rowsBeforePage + pageSize, totalRows);
	return `${firstRow.toString()}–${lastRow.toString()} of ${totalRows.toString()}`;
});

const tableClasses = computed(() =>
	`data-table ${props.truncate ? 'truncate' : ''} ${props.className}`.trim(),
);
</script>

<template>
	<div class="data-table-wrapper">
		<div class="data-table-container" :class="{ 'is-resizing': isResizing }">
			<table
				:border="0"
				:cellPadding="0"
				:cellSpacing="0"
				:class="tableClasses"
				:style="{ width: `${table.getTotalSize()}px` }"
			>
				<thead>
					<tr
						v-for="headerGroup in table.getHeaderGroups()"
						:key="headerGroup.id"
					>
						<th
							v-for="header in headerGroup.headers"
							:key="header.id"
							:colSpan="header.colSpan"
							:style="{ width: `${header.getSize()}px` }"
							:class="{
								'sticky-end':
									props.enableColumnResizing && !header.column.getCanResize(),
							}"
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
							<div
								v-if="
									props.enableColumnResizing && header.column.getCanResize()
								"
								class="resizer"
								:class="{ isResizing: header.column.getIsResizing() }"
								@mousedown="(e) => header.getResizeHandler()(e)"
								@touchstart="(e) => header.getResizeHandler()(e)"
							/>
						</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="row in table.getRowModel().rows" :key="row.id">
						<td
							v-for="cell in row.getVisibleCells()"
							:key="cell.id"
							:style="{ width: `${cell.column.getSize()}px` }"
							:class="{
								'sticky-end':
									props.enableColumnResizing && !cell.column.getCanResize(),
							}"
						>
							<FlexRender
								:render="cell.column.columnDef.cell"
								:props="cell.getContext()"
							/>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<nav
			v-if="showPagination"
			class="data-table-pagination"
			aria-label="Table pagination"
		>
			<span class="data-table-pagination-range">{{ rowRangeLabel }}</span>
			<label
				v-if="props.pageSizeOptions !== undefined"
				class="data-table-pagination-size"
			>
				Rows per page
				<select :value="pageSize" @change="changePageSize">
					<option
						v-for="option in props.pageSizeOptions"
						:key="option"
						:value="option"
					>
						{{ option }}
					</option>
				</select>
			</label>
			<CustomButton
				:disabled="!table.getCanPreviousPage()"
				aria-label="First page"
				@click="table.firstPage()"
			>
				«
			</CustomButton>
			<CustomButton
				:disabled="!table.getCanPreviousPage()"
				aria-label="Previous page"
				@click="table.previousPage()"
			>
				‹
			</CustomButton>
			<span class="data-table-pagination-page" aria-live="polite">
				Page {{ currentPage }} of
				{{ pageCount }}
			</span>
			<CustomButton
				:disabled="!table.getCanNextPage()"
				aria-label="Next page"
				@click="table.nextPage()"
			>
				›
			</CustomButton>
			<CustomButton
				:disabled="!table.getCanNextPage()"
				aria-label="Last page"
				@click="table.lastPage()"
			>
				»
			</CustomButton>
		</nav>
	</div>
</template>

<style>
:root {
	--table--border-width: 1px;
}

.data-table-container {
	width: 100%;
	overflow-x: auto;
}

.data-table-container.is-resizing {
	cursor: col-resize;
}

.data-table-container.is-resizing th {
	user-select: none;
}

.data-table-pagination {
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: var(--accessible-spacing--1x);
	padding: var(--accessible-spacing--1x);
}

.data-table-pagination-range {
	margin-right: auto;
}

.data-table-pagination-size {
	display: flex;
	align-items: center;
	gap: var(--accessible-spacing--halfx);
	margin-right: var(--accessible-spacing--1x);
}

.data-table-pagination-size select {
	border: 2px solid var(--color--gray--light);
	border-radius: var(--fixed-spacing--halfx);
	background: white;
	padding: var(--fixed-spacing--halfx);
	font-size: var(--font-size);
}

.data-table {
	table-layout: fixed;
	border-collapse: separate;
	border-spacing: 0;
	min-width: 100%;
}

.data-table th {
	position: relative;
	vertical-align: bottom;
	white-space: nowrap;
	text-align: left;
	padding: var(--accessible-spacing--1x);
	padding-right: calc(var(--accessible-spacing--1x) + 8px);
	border-bottom: var(--table--border-width) solid var(--color--gray--light);
	background-color: var(--color--gray--light);
}

.data-table .resizer {
	position: absolute;
	right: 0;
	top: 0;
	height: 100%;
	width: 12px;
	cursor: col-resize;
	user-select: none;
	touch-action: none;
	z-index: 1;
	background: linear-gradient(
		to right,
		var(--color--gray--light) 2px,
		var(--color--gray--medium) 2px,
		var(--color--gray--medium) 6px,
		var(--color--gray--light) 6px
	);
}

.data-table .resizer:hover,
.data-table .resizer.isResizing {
	background: var(--color--blue);
}

.data-table th.sticky-end,
.data-table td.sticky-end {
	position: sticky;
	right: 0;
}

.data-table th.sticky-end {
	z-index: 2;
}

.data-table td.sticky-end {
	z-index: 1;
	background-color: var(--color--white);
}

.data-table tbody tr:hover td.sticky-end {
	background-color: var(--color--gray);
}

.data-table td {
	vertical-align: top;
	padding: var(--accessible-spacing--1x);
	border-bottom: var(--table--border-width) solid var(--color--gray--light);
}

.data-table th:last-child,
.data-table td:last-child {
	border-right: none;
}

.data-table tbody tr:last-child th,
.data-table tbody tr:last-child td {
	border-bottom: var(--table--border-width) solid var(--color--gray--medium);
}

.data-table.truncate tbody td {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	max-width: 20ch;
}

.data-table tbody tr:hover {
	background-color: var(--color--gray);
}

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

.data-table .icon-link,
.data-table .pencil-icon {
	color: inherit;
	text-decoration: none;
	padding-left: 8px;
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
