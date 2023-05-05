import type { CanonicalField, Proposal } from './pdc-api';

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

export { mapProposals };
