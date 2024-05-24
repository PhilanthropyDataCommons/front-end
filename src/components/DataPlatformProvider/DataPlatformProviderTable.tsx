import { useState } from 'react';
import { CodeBracketSquareIcon as SolidBracketIcon } from '@heroicons/react/24/solid';
import { CodeBracketSquareIcon as OutlineBracketIcon } from '@heroicons/react/24/outline';
import {
	Table,
	TableHead,
	ColumnHead,
	TableBody,
	TableRow,
	RowHead,
	RowCell,
	ColumnAction,
	ColumnActions,
} from '../Table';

interface DataPlatformProviderTableProps {
	values: {
		jsonPath: string;
		fieldName: string;
		value: string;
	}[];
}

export const DataPlatformProviderTable = ({
	values,
}: DataPlatformProviderTableProps) => {
	const [displayJsonPaths, setDisplayJsonPaths] = useState(false);

	const handleDisplayJsonPathsClick = () => {
		setDisplayJsonPaths((previous) => !previous);
	};

	return (
		<Table>
			<TableHead fixed>
				<TableRow>
					<ColumnHead actions actionAlignment="left">
						Field Name
						<ColumnActions>
							<ColumnAction
								title="Toggle between field label and JSON path"
								onClick={handleDisplayJsonPathsClick}
							>
								{displayJsonPaths ? (
									<SolidBracketIcon className="icon" />
								) : (
									<OutlineBracketIcon className="icon" />
								)}
							</ColumnAction>
						</ColumnActions>
					</ColumnHead>
					<ColumnHead>Values</ColumnHead>
				</TableRow>
			</TableHead>
			<TableBody>
				{values.map(({ jsonPath, fieldName, value }) => (
					<TableRow key={jsonPath}>
						<RowHead>
							{displayJsonPaths ? <code>{jsonPath}</code> : fieldName}
						</RowHead>
						<RowCell>{value}</RowCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
