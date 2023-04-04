import React, { useEffect } from 'react';
import { OidcSecure } from '@axa-fr/react-oidc';
import { useSearchParams } from 'react-router-dom';
import {
  CanonicalField,
  Proposal,
  useCanonicalFields,
  useProposals,
} from '../pdc-api';
import { ProposalListTablePanel } from '../components/ProposalListTablePanel';

const mapFieldNames = (fields: CanonicalField[]) => Object.fromEntries(
  fields.map(({ label, shortCode }) => [shortCode, label]),
);

const extendMultimapReducer = (
  multimap: Record<string, string[]>,
  [key, value]: [string, string],
): Record<string, string[]> => ({
  [key]: (multimap[key] ?? []).concat([value]),
  ...multimap,
});

const mapProposals = (fields: CanonicalField[], proposals: Proposal[]) => (
  proposals.map((proposal: Proposal) => ({
    id: proposal.id.toString(),
    values: (
      (proposal.versions[0]?.fieldValues ?? []).map(({
        applicationFormField: { canonicalFieldId },
        value,
      }) => [
        fields.find(({ id }) => (id === canonicalFieldId))?.shortCode,
        value,
      ])
        .filter((pair): pair is [string, string] => !!pair[0])
        .reduce(extendMultimapReducer, {})
    ),
  }))
);

const ProposalList = () => {
  const [params] = useSearchParams();
  const page = params.get('page') ?? '1';
  const count = params.get('count') ?? '1000';
  const fields = useCanonicalFields();
  const proposals = useProposals(page, count);

  useEffect(() => {
    document.title = 'Proposal List - Philanthropy Data Commons';
  }, []);

  if (fields === null || proposals.length === 0) {
    return (
      <OidcSecure>
        <div>Loading data...</div>
      </OidcSecure>
    );
  }

  return (
    <OidcSecure>
      <ProposalListTablePanel
        fieldNames={mapFieldNames(fields)}
        proposals={mapProposals(fields, proposals)}
      />
    </OidcSecure>
  );
};

export { ProposalList };
