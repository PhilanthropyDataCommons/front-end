import type { Proposal, BaseField } from '@pdc/sdk';
import { PROPOSAL_NAME_CASCADE, PROPOSAL_NAME_FALLBACK } from './proposals';

const mapProposalBaseFields = (baseFields: BaseField[], proposal: Proposal) =>
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
	baseFields: BaseField[],
	proposal: Proposal,
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

const getTitle = (baseFields: BaseField[], proposal: Proposal) => {
	const titleKey = PROPOSAL_NAME_CASCADE.find((key) => {
		const baseFieldValue = getValueOfBaseField(baseFields, proposal, key);
		return (
			typeof baseFieldValue !== 'undefined' && baseFieldValue.trim() !== ''
		);
	});

	return titleKey
		? (getValueOfBaseField(baseFields, proposal, titleKey) ??
				PROPOSAL_NAME_FALLBACK)
		: PROPOSAL_NAME_FALLBACK;
};

export { mapProposalBaseFields, getValueOfBaseField, getTitle };
