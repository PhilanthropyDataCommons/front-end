import { useNavigate } from 'react-router-dom';
import { Changemaker, ChangemakerBundle } from '@pdc/sdk';
import { TableRow, RowCell } from './Table';
import { ListTable } from './ListTable';

interface ChangemakerListTableRowProps {
	changemaker: Changemaker;
}

const ChangemakerListTableRow = ({
	changemaker,
}: ChangemakerListTableRowProps) => {
	const navigate = useNavigate();

	const userHasNotSelectedText = () => {
		if (window.getSelection()?.isCollapsed) {
			navigate(`/changemakers/${changemaker.id}`);
		}
	};

	const handleRowClick = () => {
		userHasNotSelectedText();
	};
	return (
		<TableRow onClick={handleRowClick}>
			<RowCell>{changemaker.name}</RowCell>
			<RowCell>{changemaker.taxId}</RowCell>
		</TableRow>
	);
};

const DEFAULT_CHANGEMAKER_COLUMNS = ['Name', 'Tax ID'];

interface ChangemakerListTableProps {
	changemakers: ChangemakerBundle;
	columns?: string[];
}

export const ChangemakerListTable = ({
	changemakers,
	columns = DEFAULT_CHANGEMAKER_COLUMNS,
}: ChangemakerListTableProps) => (
	<ListTable
		items={changemakers.entries}
		columns={columns}
		renderItem={(changemaker) => (
			<ChangemakerListTableRow changemaker={changemaker} key={changemaker.id} />
		)}
	/>
);
