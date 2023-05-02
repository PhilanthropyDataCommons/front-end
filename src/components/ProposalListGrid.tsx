import React from 'react';
import { ProposalListGridItem } from './ProposalListGridItem';

interface ProposalListGridProps {
  proposals: {
    id: string;
    values: Record<string, string[]>;
  }[];
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
