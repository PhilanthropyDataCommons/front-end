import React from 'react';
import { Link } from 'react-router-dom';
import './ProposalListGridItem.css';

interface ProposalListGridItemProps {
  proposal: {
    id: string;
    values: Record<string, string[]>;
  };
}

export const ProposalListGridItem = ({ proposal }: ProposalListGridItemProps) => {
  const organizationName = proposal.values.organization_name
    ?? proposal.values.organization_dba_name
    ?? proposal.values.organization_legal_name
    ?? proposal.values.proposal_primary_contact_name
    ?? proposal.values.proposal_submitter_name
    ?? 'Unknown Applicant';

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
