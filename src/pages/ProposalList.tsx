import React, { useEffect } from 'react';
import { withOidcSecure } from '@axa-fr/react-oidc';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  ApiCanonicalField,
  ApiProposal,
  useCanonicalFields,
  useProposals,
} from '../pdc-api';
import { mapProposals } from '../map-proposals';
import { PanelGrid, PanelGridItem } from '../components/PanelGrid';
import { ProposalListTablePanel } from '../components/ProposalListTablePanel';

const mapFieldNames = (fields: ApiCanonicalField[]) => Object.fromEntries(
  fields.map(({ label, shortCode }) => [shortCode, label]),
);

const fieldValueMatches = (proposal: ApiProposal, query: string) => (
  proposal.versions[0]?.fieldValues.some(
    ({ value }) => value.toLowerCase().includes(query.toLowerCase()),
  )
);

const ProposalListLoader = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const page = params.get('page') ?? '1';
  const count = params.get('count') ?? '1000';
  const query = params.get('q') ?? '';
  const fields = useCanonicalFields();
  const proposals = useProposals(page, count);

  useEffect(() => {
    document.title = 'Proposal List - Philanthropy Data Commons';
  }, []);

  if (fields === null || proposals === null) {
    return (
      <div>Loading data...</div>
    );
  }

  const mappedProposals = mapProposals(
    fields,
    proposals.entries.filter((p) => fieldValueMatches(p, query)),
  );

  return (
    <PanelGrid>
      <PanelGridItem>
        <ProposalListTablePanel
          fieldNames={mapFieldNames(fields)}
          proposals={mappedProposals}
          searchQuery={query}
          onSearch={(q) => navigate(`/proposals?q=${q}`)}
        />
      </PanelGridItem>
    </PanelGrid>
  );
};

const ProposalList = withOidcSecure(ProposalListLoader);
export { ProposalList };
