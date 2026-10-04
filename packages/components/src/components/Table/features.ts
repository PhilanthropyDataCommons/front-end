import {
	tableFeatures,
	rowSortingFeature,
	createSortedRowModel,
	sortFn_alphanumeric,
	sortFn_datetime,
	sortFn_text,
	columnFilteringFeature,
	createFilteredRowModel,
	filterFn_arrIncludes,
	filterFn_equals,
	filterFn_inDateRange,
	filterFn_includesString,
	filterFn_inNumberRange,
	filterFn_weakEquals,
	columnSizingFeature,
	columnResizingFeature,
} from '@tanstack/vue-table';

// The registered functions are the ones `auto` sorting and filtering resolve.
export const features = tableFeatures({
	rowSortingFeature,
	sortedRowModel: createSortedRowModel(),
	sortFns: {
		alphanumeric: sortFn_alphanumeric,
		datetime: sortFn_datetime,
		text: sortFn_text,
	},
	columnFilteringFeature,
	filteredRowModel: createFilteredRowModel(),
	filterFns: {
		arrIncludes: filterFn_arrIncludes,
		equals: filterFn_equals,
		inDateRange: filterFn_inDateRange,
		includesString: filterFn_includesString,
		inNumberRange: filterFn_inNumberRange,
		weakEquals: filterFn_weakEquals,
	},
	columnSizingFeature,
	columnResizingFeature,
});

export type Features = typeof features;
