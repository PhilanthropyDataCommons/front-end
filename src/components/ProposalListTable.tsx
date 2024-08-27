import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FrontEndProposal } from '../interfaces/FrontEndProposal';
import { getPreferredProposalApplicantNameValues } from '../utils/proposals';
import { TableRow, RowCell } from './Table';
import { ListTable } from './ListTable';

enum ProposalDetailDestinations {
	PROPOSAL_DETAIL_PAGE = 'proposalDetailPage',
	ORGANIZATION_PROPOSAL_PANEL = 'organizationProposalPanel',
}

interface ProposalListTableRowProps {
	columns: string[];
	proposal: FrontEndProposal;
	rowClickDestination: ProposalDetailDestinations;
	organizationId?: number;
	active?: boolean;
}

const ProposalListTableRow = ({
	proposal,
	columns,
	rowClickDestination,
	organizationId = undefined,
	active = false,
}: ProposalListTableRowProps) => {
	const navigate = useNavigate();

	const userHasNotSelectedText = () => window.getSelection()?.isCollapsed;

	const handleRowClick = () => {
		if (userHasNotSelectedText()) {
			switch (rowClickDestination) {
				case 'organizationProposalPanel':
					if (organizationId) {
						navigate(
							`/organizations/${organizationId}/proposals/${proposal.id}`,
						);
					}
					break;
				case 'proposalDetailPage':
				default:
					navigate(`/proposals/${proposal.id}`);
					break;
			}
		}
	};

	const getProposalCellContents = (shortCode: string) =>
		shortCode === 'organization_name'
			? getPreferredProposalApplicantNameValues(proposal)
			: proposal.values[shortCode];

	return (
		<TableRow onClick={handleRowClick} active={active}>
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
	rowClickDestination: ProposalDetailDestinations;
	organizationId?: number;
	wrap?: boolean;
	columns?: string[];
	activeProposalId?: string | undefined;
}

const DEFAULT_PROPOSAL_COLUMNS = [
	'proposal_name',
	'proposal_summary',
	'proposal_amount_requested',
	'proposal_budget',
	'proposal_fiscal_sponsor_name',
	'proposal_start_date',
	'proposal_end_date',
	'proposal_location_of_work',
	'organization_name',
	'organization_tax_id',
	'organization_city',
	'organization_state_province',
	'organization_country',
	'organization_website',
	'organization_mission_statement',
	'organization_start_date',
	'organization_operating_budget',
];

const ProposalListTable = ({
	fieldNames,
	proposals,
	columns = DEFAULT_PROPOSAL_COLUMNS,
	wrap = false,
	rowClickDestination,
	organizationId = undefined,
	activeProposalId = undefined,
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
				rowClickDestination={rowClickDestination}
				organizationId={organizationId}
				active={activeProposalId === proposal.id}
			/>
		)}
	/>
);

export { ProposalListTable, ProposalDetailDestinations };
