import React from 'react';
import {
  Panel,
  PanelBody,
} from './Panel';
import { ProposalListGrid } from './ProposalListGrid';

interface ProposalListGridPanelProps {
  proposals: {
    id: string;
    values: Record<string, string[]>;
  }[];
}

export const ProposalListGridPanel = ({ proposals }: ProposalListGridPanelProps) => (
  <Panel>
    <PanelBody>
      <ProposalListGrid proposals={proposals} />
    </PanelBody>
  </Panel>
);
