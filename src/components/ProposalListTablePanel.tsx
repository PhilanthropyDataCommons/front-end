import React from 'react';
import {
  Panel,
  PanelHeader,
  PanelBody,
  PanelActions,
} from './Panel';
import { ProposalListTable } from './ProposalListTable';
import { Button } from './Button';

interface ProposalListTablePanelProps {
  fieldNames: Record<string, string>;
  proposals: {
    id: string;
    values: Record<string, string[]>;
  }[];
}

// For now, we are hard-coding this list.
// In the future, this will be user-configurable.
const DEFAULT_COLUMNS = [
  'organization_name',
  'organization_tax_id',
  'organization_city',
  'organization_state_province',
  'organization_country',
  'organization_website',
  // 'organization_mission_statement', // FIXME: Disabled until we have wrap
  'organization_start_date',
  'organization_operating_budget',
  'proposal_title',
  'proposal_summary',
  'proposal_amount_requested',
  'proposal_budget',
  'proposal_fiscal_sponsor_name',
  'proposal_start_date',
  'proposal_end_date',
  'proposal_location_of_work',
];

export const ProposalListTablePanel = ({
  fieldNames,
  proposals,
}: ProposalListTablePanelProps) => (
  <Panel>
    <PanelHeader>
      <PanelActions>
        <input
          type="text"
          placeholder="Text to search for…"
          className="input"
        />
        <Button disabled>
          Search
        </Button>
      </PanelActions>
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
