import React from 'react';
import { ProposalListGridItem } from './ProposalListGridItem';
import { DataViewerProposal } from '../interfaces/DataViewerProposal';

interface ProposalListGridProps {
  proposals: DataViewerProposal[];
}

export const ProposalListGrid = ({ proposals }: ProposalListGridProps) => (
  <div className="proposal-list-grid">
    {proposals.map((proposal, index) => (
      <ProposalListGridItem
        key={index} // eslint-disable-line react/no-array-index-key
        proposal={proposal}
      />
    ))}
  </div>
);
