import type { BaseField } from '@pdc/sdk';
import {
	Table,
	TableHead,
	ColumnHead,
	TableBody,
	TableRow,
	RowCell,
} from './Table';

interface BaseFieldListTableRowProps {
	field: BaseField;
}

const BaseFieldListTableRow = ({ field }: BaseFieldListTableRowProps) => (
	<TableRow>
		<RowCell>
			<code className="short-code">{field.shortCode}</code>
		</RowCell>
		<RowCell>{field.label}</RowCell>
		<RowCell>{field.description}</RowCell>
	</TableRow>
);

interface BaseFieldsProps {
	fields: BaseField[];
}

export const BaseFields = ({ fields }: BaseFieldsProps) => (
	<Table>
		<TableHead fixed>
			<TableRow>
				<ColumnHead>Key</ColumnHead>
				<ColumnHead>Label</ColumnHead>
				<ColumnHead>Description</ColumnHead>
			</TableRow>
		</TableHead>
		<TableBody>
			{fields.map((field) => (
				<BaseFieldListTableRow key={field.id} field={field} />
			))}
		</TableBody>
	</Table>
);
