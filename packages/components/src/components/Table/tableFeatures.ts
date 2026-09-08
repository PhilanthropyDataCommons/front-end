import {
	columnFilteringFeature,
	columnResizingFeature,
	columnSizingFeature,
	columnVisibilityFeature,
	createFilteredRowModel,
	createSortedRowModel,
	filterFn_arrIncludes,
	filterFn_equals,
	filterFn_inDateRange,
	filterFn_inNumberRange,
	filterFn_includesString,
	filterFn_weakEquals,
	rowSortingFeature,
	sortFn_alphanumeric,
	sortFn_basic,
	sortFn_datetime,
	sortFn_text,
	tableFeatures,
} from '@tanstack/vue-table';

/**
 * The feature set every DataTable is built with. TanStack Table v9 only exposes
 * an API when its feature is registered here, so this list must cover every
 * table, column, header, and cell method DataTable.vue calls.
 *
 * The registered sort and filter functions are the ones `'auto'` resolution can
 * name; without them a column falls back to basic sorting and no filtering.
 */
export const dataTableFeatures = tableFeatures({
	columnFilteringFeature,
	columnSizingFeature,
	columnResizingFeature,
	columnVisibilityFeature,
	rowSortingFeature,
	filteredRowModel: createFilteredRowModel(),
	sortedRowModel: createSortedRowModel(),
	filterFns: {
		arrIncludes: filterFn_arrIncludes,
		equals: filterFn_equals,
		inDateRange: filterFn_inDateRange,
		includesString: filterFn_includesString,
		inNumberRange: filterFn_inNumberRange,
		weakEquals: filterFn_weakEquals,
	},
	sortFns: {
		alphanumeric: sortFn_alphanumeric,
		basic: sortFn_basic,
		datetime: sortFn_datetime,
		text: sortFn_text,
	},
});

export type DataTableFeatures = typeof dataTableFeatures;
