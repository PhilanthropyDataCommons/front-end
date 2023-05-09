import type { ApiCanonicalField, ApiProposal } from './pdc-api';

const extendMultimapReducer = (
  multimap: Record<string, string[]>,
  [key, value]: [string, string],
): Record<string, string[]> => ({
  [key]: (multimap[key] ?? []).concat([value]),
  ...multimap,
});

const mapProposals = (fields: ApiCanonicalField[], proposals: ApiProposal[]) => (
  proposals.map((proposal) => ({
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
        .filter((pair) => (pair[1].trim() !== ''))
        .reduce(extendMultimapReducer, {})
    ),
  }))
);

export { mapProposals };
