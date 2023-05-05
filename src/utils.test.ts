import {
  getProposalValues,
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
