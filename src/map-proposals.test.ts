import {
  ApiCanonicalField,
  ApiProposal,
} from './pdc-api';
import { mapProposals } from './map-proposals';

const canonicalFields: ApiCanonicalField[] = [
  {
    id: 1,
    label: 'Organization Name',
    shortCode: 'organization_name',
  },
  {
    id: 2,
    label: 'Organization City',
    shortCode: 'organization_city',
  },
  {
    id: 3,
    label: 'Organization Contact',
    shortCode: 'organization_contact',
  },
  {
    id: 4,
    label: 'Organization Budget',
    shortCode: 'organization_budget',
  },
];

const apiProposals: ApiProposal[] = [
  {
    id: 1,
    versions: [
      {
        version: 1,
        fieldValues: [
          {
            value: 'Community Foundation',
            applicationFormField: {
              canonicalFieldId: 1,
              position: 0,
            },
          },
          {
            value: 'Chicago',
            applicationFormField: {
              canonicalFieldId: 2,
              position: 1,
            },
          },
          {
            value: 'John Doe',
            applicationFormField: {
              canonicalFieldId: 3,
              position: 2,
            },
          },
          {
            value: ' ', // Intentionally blank for testing
            applicationFormField: {
              canonicalFieldId: 4,
              position: 3,
            },
          },
        ],
      },
    ],
  },
];

const mappedProposals = mapProposals(canonicalFields, apiProposals);

test('maps the proposals', () => {
  expect(mappedProposals.length).toBe(apiProposals.length);
});

test('maps the proposal ID', () => {
  expect(mappedProposals[0]?.id).toBe(apiProposals[0]?.id.toString());
});

test('maps values to the expected place', () => {
  const targetCanonicalField = 'organization_name';

  const targetCanonicalFieldId = canonicalFields
    .find((field) => field.shortCode === targetCanonicalField)?.id;
  const proposalFieldValueIndex = apiProposals[0]?.versions[0]?.fieldValues
    .findIndex((fieldValue) => (
      fieldValue.applicationFormField.canonicalFieldId === targetCanonicalFieldId
    ));

  expect(mappedProposals[0]?.values[targetCanonicalField]?.[0])
    .toEqual(apiProposals[0]?.versions[0]?.fieldValues[proposalFieldValueIndex ?? -1]?.value);
});

test('does not map blank values', () => {
  expect(mappedProposals[0]?.values.organization_budget).toBeUndefined();
});
