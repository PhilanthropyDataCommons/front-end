import { DataViewerProposal } from '../interfaces/DataViewerProposal';

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
   * This utility returns iterates through the list of attributes where
   * we expect to find a name, in a preferential order, and returns the
   * first matching value.
   *
   * If none is found, falls back to the fallback value.
   *
   * @param  {DataViewerProposal} proposal
   * @return {(Array)} The applicant name value array.
   */
const getPreferredApplicantNameValues = (proposal: DataViewerProposal) => {
  const bestNameKey = PROPOSAL_APPLICANT_NAME_CASCADE.find((key) => proposal.values[key]);

  if (bestNameKey) {
    return proposal.values[bestNameKey];
  }

  return [PROPOSAL_APPLICANT_NAME_FALLBACK];
};

export {
  PROPOSAL_APPLICANT_NAME_CASCADE,
  PROPOSAL_APPLICANT_NAME_FALLBACK,
  getPreferredApplicantNameValues,
};
