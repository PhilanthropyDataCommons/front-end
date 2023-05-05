import { DataViewerProposal } from './interfaces/DataViewerProposal';

/**
   * Safely gets the proposal value array for a given proposal attribute key.
   *
   * @param  {DataViewerProposal} proposal
   * @param  {string} key The key for the proposal attribute we want.
   * @return {(Array|undefined)} The proposal value array. Falls back to undefined.
   */
const getProposalValues = (proposal: DataViewerProposal, key: string) => {
  // This is a temporary fix:
  // The API currently allows fields to be set to blank strings,
  // and dutifully includes those in the value array.
  // We do not consider those valid when choosing a proposal value,
  // so here we are making sure we have at least one non-blank/whitespace value.
  if (!proposal.values[key]?.some((value) => value.trim() !== '')) {
    return undefined;
  }

  return proposal.values[key];
};

/**
   * From a list of proposal attribute keys, safely gets the first valid proposal value array.
   *
   * Key order is relevant, as the first matching key's value will be returned.
   *
   * @param  {DataViewerProposal} proposal
   * @param  {string[]} keys An array of keys, ordered by preference with most-preferred first.
   * @return {(Array|undefined)} The proposal value array. Falls back to undefined.
   */
const getProposalValuesFromCandidates = (proposal: DataViewerProposal, keys: string[]) => {
  const bestKey = keys.find((key) => (key in proposal.values && getProposalValues(proposal, key)));

  return bestKey ? getProposalValues(proposal, bestKey) : undefined;
};

export {
  getProposalValues,
  getProposalValuesFromCandidates,
};
