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
	sortFn_datetime,
	sortFn_text,
	tableFeatures,
} from '@tanstack/vue-table';

export const dataTableFeatures = tableFeatures({
	rowSortingFeature,
	columnFilteringFeature,
	columnSizingFeature,
	columnResizingFeature,
	columnVisibilityFeature,
	sortedRowModel: createSortedRowModel(),
	filteredRowModel: createFilteredRowModel(),
	sortFns: {
		alphanumeric: sortFn_alphanumeric,
		datetime: sortFn_datetime,
		text: sortFn_text,
	},
	filterFns: {
		arrIncludes: filterFn_arrIncludes,
		equals: filterFn_equals,
		inDateRange: filterFn_inDateRange,
		inNumberRange: filterFn_inNumberRange,
		includesString: filterFn_includesString,
		weakEquals: filterFn_weakEquals,
	},
});

export type DataTableFeatures = typeof dataTableFeatures;
