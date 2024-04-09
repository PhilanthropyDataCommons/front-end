import { ApiBaseField, ApiProposal } from '../pdc-api';
import { PROPOSAL_NAME_CASCADE, PROPOSAL_NAME_FALLBACK } from './proposals';

const mapProposalBaseFields = (
	baseFields: ApiBaseField[],
	proposal: ApiProposal,
) =>
	(proposal.versions[0]?.fieldValues ?? []).map(
		({ applicationFormField, value }) => {
			const baseField = baseFields.find(
				({ id }) => id === applicationFormField.baseFieldId,
			);
			return {
				shortCode: baseField?.shortCode ?? 'missing',
				fieldName: baseField?.label ?? 'missing',
				position: applicationFormField.position,
				value,
			};
		},
	);

const getValueOfBaseField = (
	baseFields: ApiBaseField[],
	proposal: ApiProposal,
	baseFieldShortCode: string,
) => {
	const field = baseFields.find(
		({ shortCode }) => shortCode === baseFieldShortCode,
	);
	if (field === undefined) {
		return undefined;
	}
	const fieldValue = proposal.versions[0]?.fieldValues.find(
		({ applicationFormField }) => applicationFormField.baseFieldId === field.id,
	);
	return fieldValue?.value ?? undefined;
};

const getTitle = (baseFields: ApiBaseField[], proposal: ApiProposal) => {
	const titleKey = PROPOSAL_NAME_CASCADE.find((key) => {
		const baseFieldValue = getValueOfBaseField(baseFields, proposal, key);
		return (
			typeof baseFieldValue !== 'undefined' && baseFieldValue.trim() !== ''
		);
	});

	return titleKey
		? getValueOfBaseField(baseFields, proposal, titleKey) ??
				PROPOSAL_NAME_FALLBACK
		: PROPOSAL_NAME_FALLBACK;
};

export { mapProposalBaseFields, getValueOfBaseField, getTitle };
