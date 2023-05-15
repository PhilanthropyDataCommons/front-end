import { DataViewerProposal } from '../interfaces/DataViewerProposal';
import {
  getPreferredApplicantNameValues,
  PROPOSAL_APPLICANT_NAME_CASCADE,
  PROPOSAL_APPLICANT_NAME_FALLBACK,
} from './proposals';

const proposal = {
  id: '123',
  values: {
    organization_name: ['Org Name'],
    organization_dba_name: ['Org DBA Name'],
    organization_legal_name: ['Org Legal Name'],
    proposal_primary_contact_name: ['Proposal Contact Name'],
    proposal_submitter_name: ['Proposal Submitter Name'],
  },
} as DataViewerProposal;

test('can select most preferred applicant name', () => {
  const mostPreferredNameKey = PROPOSAL_APPLICANT_NAME_CASCADE[0] ?? '';

  expect(getPreferredApplicantNameValues(proposal)).toEqual(proposal.values[mostPreferredNameKey]);
});

test('can cascade through preferred applicant names', () => {
  const leastPreferredNameKey = PROPOSAL_APPLICANT_NAME_CASCADE.at(-1) ?? '';
  const leastPreferredNameValues = ['ABC'];
  const leastPreferredProposal = {
    id: '123',
    values: {
      [leastPreferredNameKey]: leastPreferredNameValues,
    },
  } as DataViewerProposal;

  expect(getPreferredApplicantNameValues(leastPreferredProposal)).toEqual(leastPreferredNameValues);
});

test('can fall back to fallback applicant name', () => {
  const blankProposal = {
    id: '123',
    values: {},
  } as DataViewerProposal;

  expect(getPreferredApplicantNameValues(blankProposal))
    .toEqual([PROPOSAL_APPLICANT_NAME_FALLBACK]);
});
