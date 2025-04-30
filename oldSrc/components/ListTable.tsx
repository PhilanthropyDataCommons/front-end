import React from 'react';
import { ColumnHead, Table, TableBody, TableHead, TableRow } from './Table';

interface ListTableProps<T> {
	columns: string[];
	fieldNames?: Record<string, string>;
	items: T[];
	wrap?: boolean;
	renderItem: (item: T) => React.ReactNode;
}

export const ListTable = <T,>({
	fieldNames = undefined,
	columns,
	items,
	renderItem,
	wrap = false,
}: ListTableProps<T>) => (
	<Table truncate={!wrap}>
		<TableHead fixed>
			<TableRow>
				{columns.map((shortCode) => (
					<ColumnHead key={shortCode}>
						{fieldNames ? fieldNames[shortCode] : shortCode}
					</ColumnHead>
				))}
			</TableRow>
		</TableHead>
		<TableBody>{items.map((item) => renderItem(item))}</TableBody>
	</Table>
);

export type { ListTableProps };
