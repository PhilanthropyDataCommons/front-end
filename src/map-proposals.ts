import type { ApiBaseField, ApiProposal } from './pdc-api';

const extendMultimapReducer = (
  multimap: Record<string, string[]>,
  [key, value]: [string, string],
): Record<string, string[]> => ({
  [key]: (multimap[key] ?? []).concat([value]),
  ...multimap,
});

const mapProposals = (fields: ApiBaseField[], proposals: ApiProposal[]) => (
  proposals.map((proposal) => ({
    id: proposal.id.toString(),
    values: (
      (proposal.versions[0]?.fieldValues ?? []).map(({
        applicationFormField: { baseFieldId },
        value,
      }) => [
        fields.find(({ id }) => (id === baseFieldId))?.shortCode,
        value,
      ])
        .filter((pair): pair is [string, string] => !!pair[0])
        .filter((pair) => (pair[1].trim() !== ''))
        .reduce(extendMultimapReducer, {})
    ),
  }))
);

export { mapProposals };
