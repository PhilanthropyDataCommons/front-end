import React from 'react';
import { DataViewerProposal } from '../interfaces/DataViewerProposal';
import {
  Panel,
  PanelBody,
} from './Panel';
import { ProposalListGrid } from './ProposalListGrid';

interface ProposalListGridPanelProps {
  proposals: DataViewerProposal[];
  activeProposalId?: string | undefined;
}

export const ProposalListGridPanel = ({
  proposals,
  activeProposalId = undefined,
}: ProposalListGridPanelProps) => (
  <Panel>
    <PanelBody padded={false}>
      <ProposalListGrid
        proposals={proposals}
        activeProposalId={activeProposalId}
      />
    </PanelBody>
  </Panel>
);
