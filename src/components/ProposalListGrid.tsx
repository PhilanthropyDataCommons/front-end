import React, { useEffect } from 'react';
import { ProposalListGridItem } from './ProposalListGridItem';
import { DataViewerProposal } from '../interfaces/DataViewerProposal';

interface ProposalListGridProps {
  proposals: DataViewerProposal[];
  activeProposalId?: string | undefined;
}

export const ProposalListGrid = ({
  proposals,
  activeProposalId = undefined,
}: ProposalListGridProps) => {
  const listGridRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    // We want the active proposal to be visible in the sidebar
    // when the page renders, so the user knows "where they are".
    //
    // If we just scrolled the active proposal into view, however,
    // the user might not realize there are more proposals
    // "above" the active one; thus, we scroll to the previous element.
    // If it doesn't exist -- i.e., if the first proposal is active --
    // then we can noop since it's visible by default anyway.
    //
    // Note that we only run this on initial page render,
    // not every time the active proposal changes.
    // This is because we only need to orient the user on load;
    // after that, their clicks run the show.
    listGridRef.current?.querySelector('.active')?.previousElementSibling?.scrollIntoView();
  }, []);

  return (
    <div
      ref={listGridRef}
      className="proposal-list-grid"
    >
      {proposals.map((proposal, index) => (
        <ProposalListGridItem
          key={index} // eslint-disable-line react/no-array-index-key
          proposal={proposal}
          active={activeProposalId === proposal.id}
        />
      ))}
    </div>
  );
};
