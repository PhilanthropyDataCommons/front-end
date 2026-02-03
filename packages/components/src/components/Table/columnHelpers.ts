import type {
	AccessorKeyColumnDef,
	DeepKeys,
	DeepValue,
	IdentifiedColumnDef,
	RowData,
	DisplayColumnDef,
	CellContext,
} from '@tanstack/vue-table';

const DEFAULT_ACTION_COLUMN_SIZE = 100;
const DEFAULT_ICON_ACTION_COLUMN_SIZE = 40;

interface ColumnHelper<TData extends RowData> {
	accessor: <
		TAccessor extends DeepKeys<TData>,
		TValue extends DeepValue<TData, TAccessor>,
	>(
		accessor: TAccessor,
		header: string,
		options?: Omit<
			IdentifiedColumnDef<TData, TValue>,
			'accessorKey' | 'header'
		>,
	) => AccessorKeyColumnDef<TData, TValue>;

	text: <
		TAccessor extends DeepKeys<TData>,
		TValue extends DeepValue<TData, TAccessor>,
	>(
		accessor: TAccessor,
		header: string,
		options?: Omit<
			IdentifiedColumnDef<TData, TValue>,
			'accessorKey' | 'header'
		> & { cell?: (info: CellContext<TData, TValue>) => string },
	) => AccessorKeyColumnDef<TData, TValue>;

	display: (
		id: string,
		header: string,
		options?: Omit<DisplayColumnDef<TData>, 'id' | 'header'>,
	) => DisplayColumnDef<TData>;

	action: (
		id: string,
		header: string,
		cell: (row: TData) => unknown,
		options?: {
			size?: number;
			minSize?: number;
			maxSize?: number;
		},
	) => DisplayColumnDef<TData>;

	icon: (
		id: string,
		header: string,
		cell: (row: TData) => unknown,
		options?: {
			size?: number;
		},
	) => DisplayColumnDef<TData>;
}

export function createColumnHelper<
	TData extends RowData,
>(): ColumnHelper<TData> {
	return {
		accessor: (accessor, header, options) => ({
			...options,
			header,
			accessorKey: accessor,
		}),

		text: (accessor, header, options) => ({
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
			...options,
			header,
			accessorKey: accessor,
		}),

		display: (id, header, options) => ({
			...options,
			id,
			header,
		}),

		action: (id, header, cell, options) => ({
			id,
			header,
			cell: (info) => cell(info.row.original),
			enableSorting: false,
			enableResizing: options?.size === undefined,
			size: options?.size ?? DEFAULT_ACTION_COLUMN_SIZE,
			minSize: options?.minSize,
			maxSize: options?.maxSize,
		}),

		icon: (id, header, cell, options) => ({
			id,
			header,
			cell: (info) => cell(info.row.original),
			enableSorting: false,
			enableResizing: false,
			size: options?.size ?? DEFAULT_ICON_ACTION_COLUMN_SIZE,
		}),
	};
}
