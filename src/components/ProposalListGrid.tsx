import React from 'react';
import { ProposalListGridItem } from './ProposalListGridItem';
import { DataViewerProposal } from '../interfaces/DataViewerProposal';

interface ProposalListGridProps {
  proposals: DataViewerProposal[];
  activeProposalId?: string | undefined;
}

export const ProposalListGrid = ({
  proposals,
  activeProposalId = undefined,
}: ProposalListGridProps) => (
  <div className="proposal-list-grid">
    {proposals.map((proposal, index) => (
      <ProposalListGridItem
        key={index} // eslint-disable-line react/no-array-index-key
        proposal={proposal}
        active={activeProposalId === proposal.id}
      />
    ))}
  </div>
);
