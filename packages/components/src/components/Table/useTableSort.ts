import {
	shallowRef,
	computed,
	toValue,
	type ShallowRef,
	type ComputedRef,
	type MaybeRefOrGetter,
} from 'vue';
import { orderBy } from 'lodash';
import type { SortDirection, SortConfig } from './types';

/**
 * A composable for managing table sorting state and logic.
 *
 * @template T - The entity type being sorted
 * @param data - Array of data to sort (can be a ref, computed, or plain array)
 * @param defaultSortKey - Optional default column to sort by
 * @param defaultSortDirection - Optional default sort direction
 * @returns Sorting state and methods
 *
 */
export function useTableSort<T extends Record<string, unknown>>(
	data: MaybeRefOrGetter<T[]>,
	defaultSortKey?: keyof T,
	defaultSortDirection: SortDirection = 'asc',
): {
	sortedData: ComputedRef<T[]>;
	sortConfig: ShallowRef<SortConfig<T> | null>;
	handleSort: (key: keyof T) => void;
	getSortDirection: (key: keyof T) => SortDirection;
} {
	const sortConfig = shallowRef<SortConfig<T> | null>(
		defaultSortKey == null
			? null
			: { key: defaultSortKey, direction: defaultSortDirection },
	);

	const sortedData = computed((): T[] => {
		const items = toValue(data);
		const { value: config } = sortConfig;
		if (config?.direction == null) {
			return items;
		}

		const { key, direction } = config;
		return orderBy(items, [String(key)], [direction]);
	});

	const handleSort = (key: keyof T): void => {
		const { value: config } = sortConfig;
		if (config?.key !== key) {
			sortConfig.value = { key, direction: 'asc' };
		} else if (config.direction === 'asc') {
			sortConfig.value = { key, direction: 'desc' };
		} else {
			sortConfig.value = null;
		}
	};

	const getSortDirection = (key: keyof T): SortDirection => {
		const { value: config } = sortConfig;
		if (config?.key === key) {
			return config.direction;
		}
		return null;
	};

	return {
		sortedData,
		sortConfig,
		handleSort,
		getSortDirection,
	};
}
