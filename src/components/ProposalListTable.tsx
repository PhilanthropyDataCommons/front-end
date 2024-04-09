import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FrontEndProposal } from '../interfaces/FrontEndProposal';
import { getPreferredProposalApplicantNameValues } from '../utils/proposals';
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
			? getPreferredProposalApplicantNameValues(proposal)
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
	fieldNames: Record<string, string>;
	proposals: FrontEndProposal[];
	wrap?: boolean;
	columns?: string[];
}

const DEFAULT_PROPOSAL_COLUMNS = [
	'organization_name',
	'organization_tax_id',
	'organization_city',
	'organization_state_province',
	'organization_country',
	'organization_website',
	'organization_mission_statement',
	'organization_start_date',
	'organization_operating_budget',
	'proposal_name',
	'proposal_summary',
	'proposal_amount_requested',
	'proposal_budget',
	'proposal_fiscal_sponsor_name',
	'proposal_start_date',
	'proposal_end_date',
	'proposal_location_of_work',
];

export const ProposalListTable = ({
	fieldNames,
	proposals,
	columns = DEFAULT_PROPOSAL_COLUMNS,
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
