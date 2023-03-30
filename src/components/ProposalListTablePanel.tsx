import React from 'react';
import {
  Panel,
  PanelHeader,
  PanelBody,
  PanelTitle,
  PanelTitleWrapper,
} from './Panel';
import { ProposalListTable } from './ProposalListTable';

interface ProposalListTablePanelProps {
  fieldNames: Record<string, string>,
  proposals: Record<string, string[]>[],
}

// For now, we are hard-coding this list.
// In the future, this will be user-configurable.
// FIXME: The values I'm providing below are completely made up
//        and should be replaced with real desired fields.
//        Note that we should update the stories accordingly.
const DEFAULT_COLUMNS = [
  'organization_ein',
  'organization_name',
  'organization_state',
  'proposal_date',
  'proposal_name',
  'proposal_budget',
  'proposal_type',
];

export const ProposalListTablePanel = ({
  fieldNames,
  proposals,
}: ProposalListTablePanelProps) => (
  <Panel>
    <PanelHeader>
      <PanelTitleWrapper>
        <PanelTitle>Proposals</PanelTitle>
      </PanelTitleWrapper>
    </PanelHeader>
    <PanelBody>
      <ProposalListTable
        fieldNames={fieldNames}
        proposals={proposals}
        columns={DEFAULT_COLUMNS}
      />
    </PanelBody>
  </Panel>
);
