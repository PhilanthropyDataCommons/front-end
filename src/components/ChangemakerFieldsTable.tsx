import { useEffect, useState } from 'react';
import {
	ProposalVersion,
	type ApplicationFormField,
	type Changemaker,
} from '@pdc/sdk';
import {
	Table,
	TableHead,
	ColumnHead,
	TableBody,
	TableRow,
	RowHead,
	RowCell,
} from './Table';
import { useProposalVersion } from '../pdc-api';

interface ChangemakerFieldsTableRowProps {
	value: string;
	applicationFormField: ApplicationFormField;
	proposalVersionId: number;
}

const ChangemakerFieldsTableRow = ({
	value,
	applicationFormField,
	proposalVersionId,
}: ChangemakerFieldsTableRowProps) => {
	const [proposalVersionState, setProposalVersionState] =
		useState<ProposalVersion>();
	const [proposalVersion] = useProposalVersion(proposalVersionId);
	useEffect(() => {
		if (proposalVersion) {
			setProposalVersionState(proposalVersion);
		}

		return () => {};
	}, [proposalVersion]);

	return (
		<TableRow>
			<RowHead>{applicationFormField.label}</RowHead>
			<RowCell>{value}</RowCell>
			<RowCell>
				{proposalVersionState?.source ? proposalVersion?.source?.label : ' '}
			</RowCell>
		</TableRow>
	);
};

interface ChangemakerFieldsTableProps {
	changemaker: Changemaker;
}

export const ChangemakerFieldsTable = ({
	changemaker,
}: ChangemakerFieldsTableProps) => {
	return (
		<Table>
			<TableHead fixed>
				<TableRow>
					<ColumnHead actions actionAlignment="left">
						Changemaker Field Label
					</ColumnHead>
					<ColumnHead>Changemaker Field Value </ColumnHead>
					<ColumnHead>Changemaker Field Source</ColumnHead>
				</TableRow>
			</TableHead>
			<TableBody>
				{changemaker.fields.map(
					({ value, applicationFormField, proposalVersionId }) => (
						<ChangemakerFieldsTableRow
							key={value}
							value={value}
							applicationFormField={applicationFormField}
							proposalVersionId={proposalVersionId}
						/>
					),
				)}
			</TableBody>
		</Table>
	);
};
