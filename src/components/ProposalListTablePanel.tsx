import React, { useState } from 'react';
import { Bars3BottomLeftIcon } from '@heroicons/react/24/solid';
import { DataViewerProposal } from '../interfaces/DataViewerProposal';
import {
  Panel,
  PanelHeader,
  PanelBody,
  PanelActions,
} from './Panel';
import { ProposalListTable } from './ProposalListTable';
import { Button } from './Button';
import { Search } from './Search';

interface ProposalListTablePanelProps {
  fieldNames: Record<string, string>;
  proposals: DataViewerProposal[];
  onSearch: (query: string) => void;
  searchQuery?: string;
  loading?: boolean;
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
  'organization_mission_statement',
  'organization_start_date',
  'organization_operating_budget',
  'proposal_name',
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
  onSearch,
  searchQuery = '',
  loading = false,
}: ProposalListTablePanelProps) => {
  const [wrap, setWrap] = useState(false);

  const handleWrapClick = () => setWrap((previous) => !previous);

  const hasSearchQuery = searchQuery !== '';

  return (
    <Panel>
      <PanelHeader>
        <PanelActions>
          <Search onSearch={onSearch} initialQuery={searchQuery} />
        </PanelActions>
        <PanelActions>
          <Button
            onClick={handleWrapClick}
            color={wrap ? 'blue' : 'gray'}
          >
            <Bars3BottomLeftIcon className="icon" />
            Toggle wrapping
          </Button>
        </PanelActions>
      </PanelHeader>
      <PanelBody>
        {loading ? (
          <div className="panel-message">
            {hasSearchQuery ? 'Searching…' : 'Loading…'}
          </div>
        ) : (
          <ProposalListTable
            fieldNames={fieldNames}
            proposals={proposals}
            columns={DEFAULT_COLUMNS}
            wrap={wrap}
          />
        )}
      </PanelBody>
    </Panel>
  );
};
