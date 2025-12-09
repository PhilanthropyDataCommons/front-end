import type { ColumnDef } from '@tanstack/vue-table';
import { h, type Component } from 'vue';
import { RouterLink } from 'vue-router';

const DEFAULT_ACTION_COLUMN_SIZE = 100;
const DEFAULT_ICON_ACTION_COLUMN_SIZE = 60;

export function createColumnHelper<TData>(): {
	accessor: <TAccessor extends keyof TData & string>(
		accessor: TAccessor,
		column: Omit<ColumnDef<TData, TData[TAccessor]>, 'accessorKey'>,
	) => ColumnDef<TData, TData[TAccessor]>;
	display: (column: ColumnDef<TData>) => ColumnDef<TData>;
} {
	return {
		accessor: <TAccessor extends keyof TData & string>(
			accessor: TAccessor,
			column: Omit<ColumnDef<TData, TData[TAccessor]>, 'accessorKey'>,
		): ColumnDef<TData, TData[TAccessor]> => ({
			accessorKey: accessor,
			...column,
		}),

		display: (column: ColumnDef<TData>): ColumnDef<TData> => column,
	};
}

export function textColumn<TData>(
	accessor: keyof TData & string,
	header: string,
	options?: {
		enableSorting?: boolean;
		enableResizing?: boolean;
		size?: number;
		minSize?: number;
		maxSize?: number;
	},
): ColumnDef<TData> {
	return {
		accessorKey: accessor,
		header,
		cell: (info) => {
			const value = info.getValue();
			if (value === null || value === undefined) {
				return '';
			}
			if (
				typeof value === 'string' ||
				typeof value === 'number' ||
				typeof value === 'boolean'
			) {
				return String(value);
			}
			return '';
		},
		enableSorting: options?.enableSorting ?? true,
		enableResizing: options?.enableResizing ?? true,
		size: options?.size,
		minSize: options?.minSize,
		maxSize: options?.maxSize,
	};
}

export function componentColumn<TData>(
	accessor: keyof TData & string,
	header: string,
	component: unknown,
	options?: {
		enableSorting?: boolean;
		enableResizing?: boolean;
		size?: number;
		minSize?: number;
		maxSize?: number;
	},
): ColumnDef<TData> {
	return {
		accessorKey: accessor,
		header,
		// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion, @typescript-eslint/consistent-type-assertions -- Component typing is intentionally flexible
		cell: (info) => h(component as never, { value: info.getValue() } as never),
		enableSorting: options?.enableSorting ?? false,
		enableResizing: options?.enableResizing ?? true,
		size: options?.size,
		minSize: options?.minSize,
		maxSize: options?.maxSize,
	};
}

export function actionColumn<TData>(
	id: string,
	header: string,
	cell: (row: TData) => unknown,
	options?: {
		size?: number;
		minSize?: number;
		maxSize?: number;
	},
): ColumnDef<TData> {
	return {
		id,
		header,
		cell: (info) => cell(info.row.original),
		enableSorting: false,
		enableResizing: options?.size === undefined,
		size: options?.size ?? DEFAULT_ACTION_COLUMN_SIZE,
		minSize: options?.minSize,
		maxSize: options?.maxSize,
	};
}

export function linkIconColumn<TData>(
	id: string,
	header: string,
	options: {
		to: (row: TData) => string;
		icon: Component;
		size?: number;
		linkClass?: string;
		iconClass?: string;
	},
): ColumnDef<TData> {
	return {
		id,
		header,
		cell: (info) =>
			h(
				RouterLink,
				{
					to: options.to(info.row.original),
					class: options.linkClass ?? 'icon-link',
				},
				() => h(options.icon, { class: options.iconClass ?? 'icon' }),
			),
		enableSorting: false,
		enableResizing: false,
		size: options.size ?? DEFAULT_ICON_ACTION_COLUMN_SIZE,
	};
}
