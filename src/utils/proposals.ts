import { FrontEndProposal } from '../interfaces/FrontEndProposal';

/**
 * Iterates through a list of fields on the proposal,
 * in preferential order (most to least), looking for desired data.
 * Returns the first matching value. If none is found, returns the fallback value.
 *
 * @param  {FrontEndProposal} proposal
 * @param  {string[]} candidates Array of candidate field names, in order.
 * @param  {string} fallback Value to fall back to if no preferred data is found.
 * @return {(Array)} Preferred value, but as an array (due to proposal ergonomics).
 */
const getPreferredProposalValues = (
	proposal: FrontEndProposal,
	candidates: string[],
	fallback: string,
) => {
	const preferredValue = candidates.find((key) => proposal.values[key]);

	if (preferredValue) {
		return proposal.values[preferredValue];
	}

	return [fallback];
};

const PROPOSAL_APPLICANT_NAME_CASCADE = [
	'organization_name',
	'organization_dba_name',
	'organization_legal_name',
	'proposal_primary_contact_name',
	'proposal_submitter_name',
];

const PROPOSAL_APPLICANT_NAME_FALLBACK = 'Unknown Applicant';

/**
 * Proposals may store the applicant name in one of several fields.
 * This utility iterates through the list of attributes
 * where we expect to find a name, in a preferential order,
 * and returns the first matching value.
 * If none is found, falls back to the fallback value.
 *
 * @param  {FrontEndProposal} proposal
 * @return {(Array)} The applicant name value array.
 */
const getPreferredProposalApplicantNameValues = (proposal: FrontEndProposal) =>
	getPreferredProposalValues(
		proposal,
		PROPOSAL_APPLICANT_NAME_CASCADE,
		PROPOSAL_APPLICANT_NAME_FALLBACK,
	);

const PROPOSAL_NAME_CASCADE = ['proposal_name', 'proposal_summary'];

const PROPOSAL_NAME_FALLBACK = 'Untitled Proposal';

/**
 * Proposals may not have a name, in which case we fall back to summary.
 *
 * @param  {FrontEndProposal} proposal
 * @return {(Array)} The proposal name, or a fallback.
 */
const getPreferredProposalNameValues = (proposal: FrontEndProposal) =>
	getPreferredProposalValues(
		proposal,
		PROPOSAL_NAME_CASCADE,
		PROPOSAL_NAME_FALLBACK,
	);

export {
	getPreferredProposalValues,
	PROPOSAL_APPLICANT_NAME_CASCADE,
	PROPOSAL_APPLICANT_NAME_FALLBACK,
	getPreferredProposalApplicantNameValues,
	PROPOSAL_NAME_CASCADE,
	PROPOSAL_NAME_FALLBACK,
	getPreferredProposalNameValues,
};
