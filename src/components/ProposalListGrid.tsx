import React from 'react';
import { Link } from 'react-router-dom';
import { FrontEndProposal } from '../interfaces/FrontEndProposal';
import { getPreferredApplicantNameValues } from '../utils/proposals';
import { ListGrid } from './ListGrid';
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
			<div className="list-grid-item-applicant-name">{applicantName}</div>
			{applicantLocation ? (
				<div className="list-grid-item-applicant-address">
					{applicantLocation}
				</div>
			) : null}
			{proposal.values.proposal_name ? (
				<div className="list-grid-item-proposal-name">
					{proposal.values.proposal_name}
				</div>
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
