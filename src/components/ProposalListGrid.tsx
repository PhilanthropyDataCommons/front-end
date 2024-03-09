import React from 'react';
import { Link } from 'react-router-dom';
import { FrontEndProposal } from '../interfaces/FrontEndProposal';
import { getPreferredApplicantNameValues } from '../utils/proposals';
import { LIST_GRID_ITEM_TRUNCATE_LENGTH, ListGrid } from './ListGrid';
import './ListGridItem.css';

interface ProposalListGridItemProps {
	proposal: FrontEndProposal;
	active?: boolean;
}

const ProposalListGridItem = ({
	proposal,
	active = false,
}: ProposalListGridItemProps) => {
	const applicantName = getPreferredApplicantNameValues(proposal);
	const title = proposal.values.proposal_name
		? proposal.values.proposal_name
		: proposal.values.proposal_summary
				?.toString()
				.substring(0, LIST_GRID_ITEM_TRUNCATE_LENGTH);

	const applicantLocation = [
		'organization_city',
		'organization_state_province',
		'organization_country',
	]
		.map((key) => proposal.values[key]?.filter((value) => value !== '')) // Filter out blank strings
		.filter((value) => (value ?? []).length > 0) // Filter out empty value arrays
		.join(', ');

	return (
		<Link
			to={`/proposals/${proposal.id}`}
			className={`list-grid-item ${active ? 'active' : ''}`.trim()}
		>
			{title ? (
				<div className="list-grid-item-title">
					{title}
				</div>
			) : (
				<div className="list-grid-item-title">Untitled Proposal</div>
			)}
			<div className="list-grid-item-detail">{applicantName}</div>

			{applicantLocation ? (
				<div className="list-grid-item-detail">{applicantLocation}</div>
			) : null}
		</Link>
	);
};

interface ProposalListGridProps {
	proposals: FrontEndProposal[];
	activeProposalId?: string | undefined;
}

export const ProposalListGrid = ({
	proposals,
	activeProposalId = undefined,
}: ProposalListGridProps) => (
	<ListGrid
		items={proposals}
		renderItem={(proposal) => (
			<ProposalListGridItem
				proposal={proposal}
				active={activeProposalId === proposal.id}
				key={proposal.id}
			/>
		)}
	/>
);
