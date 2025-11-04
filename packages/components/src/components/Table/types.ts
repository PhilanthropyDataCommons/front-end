export type SortDirection = 'asc' | 'desc' | null;

export interface SortConfig<T> {
	key: keyof T;
	direction: SortDirection;
}
