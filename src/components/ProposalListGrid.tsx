import React from 'react';
import { FrontEndProposal } from '../interfaces/FrontEndProposal';
import { getPreferredApplicantNameValues } from '../utils/proposals';
import {
	ListGrid,
	ListGridItem,
	ListGridItemDetails,
	ListGridItemTitle,
} from './ListGrid';

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
		<ListGridItem linkTo={`/proposals/${proposal.id}`} active={active}>
			<ListGridItemTitle>{applicantName}</ListGridItemTitle>
			{applicantLocation ? (
				<ListGridItemDetails>{applicantLocation}</ListGridItemDetails>
			) : null}
			{proposal.values.proposal_name ? (
				<ListGridItemDetails>
					{proposal.values.proposal_name}
				</ListGridItemDetails>
			) : null}
		</ListGridItem>
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
