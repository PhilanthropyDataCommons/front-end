import { expect, test } from 'vitest';
import { FrontEndProposal } from '../interfaces/FrontEndProposal';
import {
	PROPOSAL_APPLICANT_NAME_CASCADE,
	PROPOSAL_APPLICANT_NAME_FALLBACK,
	PROPOSAL_NAME_CASCADE,
	PROPOSAL_NAME_FALLBACK,
	getPreferredProposalApplicantNameValues,
	getPreferredProposalNameValues,
	getPreferredProposalValues,
} from './proposals';

const proposal = {
	id: '123',
	values: {
		organization_name: ['Org Name'],
		organization_dba_name: ['Org DBA Name'],
		organization_legal_name: ['Org Legal Name'],
		proposal_primary_contact_name: ['Proposal Contact Name'],
		proposal_submitter_name: ['Proposal Submitter Name'],
		proposal_name: ['Proposal Name'],
		proposal_summary: ['Proposal Summary'],
	},
} as FrontEndProposal;

const blankProposal = {
	id: '123',
	values: {},
} as FrontEndProposal;

test('can select most preferred proposal value', () => {
	const candidateKeys = ['organization_name', 'proposal_name'];
	const mostPreferredNameKey = candidateKeys[0] ?? '';

	expect(
		getPreferredProposalValues(proposal, candidateKeys, 'Fallback'),
	).toEqual(proposal.values[mostPreferredNameKey]);
});

test('can select most preferred applicant name', () => {
	const mostPreferredNameKey = PROPOSAL_APPLICANT_NAME_CASCADE[0] ?? '';

	expect(getPreferredProposalApplicantNameValues(proposal)).toEqual(
		proposal.values[mostPreferredNameKey],
	);
});

test('can cascade through preferred applicant names', () => {
	const leastPreferredNameKey = PROPOSAL_APPLICANT_NAME_CASCADE.at(-1) ?? '';
	const leastPreferredNameValues = ['ABC'];
	const leastPreferredProposal = {
		id: '123',
		values: {
			[leastPreferredNameKey]: leastPreferredNameValues,
		},
	} as FrontEndProposal;

	expect(
		getPreferredProposalApplicantNameValues(leastPreferredProposal),
	).toEqual(leastPreferredNameValues);
});

test('can fall back to fallback applicant name', () => {
	expect(getPreferredProposalApplicantNameValues(blankProposal)).toEqual([
		PROPOSAL_APPLICANT_NAME_FALLBACK,
	]);
});

test('can select most preferred proposal name', () => {
	const mostPreferredNameKey = PROPOSAL_NAME_CASCADE[0] ?? '';

	expect(getPreferredProposalNameValues(proposal)).toEqual(
		proposal.values[mostPreferredNameKey],
	);
});

test('can fall back to fallback proposal name', () => {
	expect(getPreferredProposalNameValues(blankProposal)).toEqual([
		PROPOSAL_NAME_FALLBACK,
	]);
});
