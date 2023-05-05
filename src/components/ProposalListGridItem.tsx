import React from 'react';
import { Link } from 'react-router-dom';
import { DataViewerProposal } from '../interfaces/DataViewerProposal';
import { getProposalValuesFromCandidates } from '../utils';
import './ProposalListGridItem.css';

interface ProposalListGridItemProps {
  proposal: DataViewerProposal;
}

export const ProposalListGridItem = ({ proposal }: ProposalListGridItemProps) => {
  const organizationName = getProposalValuesFromCandidates(proposal, [
    'organization_name',
    'organization_dba_name',
    'organization_legal_name',
    'proposal_primary_contact_name',
    'proposal_submitter_name',
  ]) ?? 'Unknown Applicant';

  const organizationLocation = ['organization_city', 'organization_state_province', 'organization_country']
    .map((key) => proposal.values[key]?.filter((value) => value !== '')) // Filter out blank strings
    .filter((value) => (value ?? []).length > 0) // Filter out empty value arrays
    .join(', ');

  return (
    <Link
      to={`/proposals/${proposal.id}`}
      className="proposal-list-grid-item"
    >
      <div className="proposal--organization-name">
        {organizationName}
      </div>
      {organizationLocation ? (
        <div className="proposal--organization-address">
          {organizationLocation}
        </div>
      ) : null}
      {proposal.values.proposal_name ? (
        <div className="proposal--proposal-name">
          {proposal.values.proposal_name}
        </div>
      ) : null}
    </Link>
  );
};
