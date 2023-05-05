import {
  getProposalValues,
  getProposalValuesFromCandidates,
} from './utils';

test('can get proposal value', () => {
  const proposal = {
    id: 'proposal',
    values: {
      org_name: ['ABC Company'],
    },
  };

  expect(getProposalValues(proposal, 'org_name')).toEqual(proposal.values.org_name);
});

test('returns undefined for missing values', () => {
  const proposal = {
    id: 'proposal',
    values: {
      empty_array: [],
      string_only: [''],
      whitespace: [' '],
    },
  };

  expect(getProposalValues(proposal, 'missing_attribute')).toBeUndefined();
  expect(getProposalValues(proposal, 'empty_array')).toBeUndefined();
  expect(getProposalValues(proposal, 'string_only')).toBeUndefined();
  expect(getProposalValues(proposal, 'whitespace')).toBeUndefined();
});

test('can get best proposal value from candidates', () => {
  const proposal = {
    id: 'proposal',
    values: {
      empty_array: [],
      string_only: [''],
      org_legal_name: ['ABC Company, LLC'],
      org_dba_name: ['XYZ Company'],
    },
  };

  // Intentionally includes some attributes that should be skipped before the target attributes.
  const preferDbaName = [
    'missing_attribute',
    'empty_array',
    'string_only',
    'org_dba_name',
    'org_legal_name',
  ];
  const preferLegalName = [
    'missing_attribute',
    'empty_array',
    'string_only',
    'org_legal_name',
    'org_dba_name',
  ];

  expect(getProposalValuesFromCandidates(proposal, preferDbaName))
    .toEqual(proposal.values.org_dba_name);

  expect(getProposalValuesFromCandidates(proposal, preferLegalName))
    .toEqual(proposal.values.org_legal_name);
});
