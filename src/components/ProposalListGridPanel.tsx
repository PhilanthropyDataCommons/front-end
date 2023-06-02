import React from 'react';
import { DataViewerProposal } from '../interfaces/DataViewerProposal';
import {
  Panel,
  PanelBody,
} from './Panel';
import { ProposalListGrid } from './ProposalListGrid';

interface ProposalListGridPanelProps {
  proposals: DataViewerProposal[];
}

export const ProposalListGridPanel = ({ proposals }: ProposalListGridPanelProps) => (
  <Panel>
    <PanelBody padded={false}>
      <ProposalListGrid proposals={proposals} />
    </PanelBody>
  </Panel>
);
