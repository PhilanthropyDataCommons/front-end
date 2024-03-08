import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FrontEndProposal } from '../interfaces/FrontEndProposal';
import { getPreferredApplicantNameValues } from '../utils/proposals';
import { TableRow, RowCell } from './Table';
import { ListTable } from './ListTable';

interface ProposalListTableRowProps {
	columns: string[];
	proposal: FrontEndProposal;
}

const ProposalListTableRow = ({
	proposal,
	columns,
}: ProposalListTableRowProps) => {
	const navigate = useNavigate();

	const userHasNotSelectedText = () => {
		if (window.getSelection()?.isCollapsed) {
			navigate(`/proposals/${proposal.id}`);
		}
	};

	const handleRowClick = () => {
		userHasNotSelectedText();
	};

	const getProposalCellContents = (shortCode: string) =>
		shortCode === 'organization_name'
			? getPreferredApplicantNameValues(proposal)
			: proposal.values[shortCode];

	return (
		<TableRow onClick={handleRowClick}>
			{/* Iterate over columns to ensure order. */}
			{columns.map((shortCode) => (
				<RowCell key={shortCode}>{getProposalCellContents(shortCode)}</RowCell>
			))}
		</TableRow>
	);
};

interface ProposalListTableProps {
	columns: string[];
	fieldNames: Record<string, string>;
	proposals: FrontEndProposal[];
	wrap?: boolean;
}

export const ProposalListTable = ({
	fieldNames,
	proposals,
	columns,
	wrap = false,
}: ProposalListTableProps) => (
	<ListTable
		items={proposals}
		columns={columns}
		fieldNames={fieldNames}
		wrap={wrap}
		renderItem={(proposal) => (
			<ProposalListTableRow
				key={proposal.id}
				proposal={proposal}
				columns={columns}
			/>
		)}
	/>
);
