import { Proposal, BaseField } from '@pdc/sdk';
import { mapProposals } from './map-proposals';

const baseFields: BaseField[] = [
	{
		id: 1,
		label: 'Organization Name',
		shortCode: 'organization_name',
		description: 'Common name of the organization',
		scope: BaseField.ScopeEnum.Proposal,
		dataType: BaseField.DataTypeEnum.String,
		createdAt: new Date(),
	},
	{
		id: 2,
		label: 'Organization City',
		shortCode: 'organization_city',
		description: 'City of the organization',
		scope: BaseField.ScopeEnum.Proposal,
		dataType: BaseField.DataTypeEnum.String,
		createdAt: new Date(),
	},
	{
		id: 3,
		label: 'Organization Contact',
		shortCode: 'organization_contact',
		description: 'Person contact regarding this organization',
		scope: BaseField.ScopeEnum.Proposal,
		dataType: BaseField.DataTypeEnum.String,
		createdAt: new Date(),
	},
	{
		id: 4,
		label: 'Organization Budget',
		shortCode: 'organization_budget',
		description: 'Annual budget of the organization',
		scope: BaseField.ScopeEnum.Proposal,
		dataType: BaseField.DataTypeEnum.String,
		createdAt: new Date(),
	},
];

const proposals: Proposal[] = [
	{
		id: 1,
		opportunityId: 1,
		externalId: 'abc123',
		versions: [
			{
				id: 1,
				proposalId: 1,
				version: 1,
				applicationFormId: 1,
				fieldValues: [
					{
						id: 1,
						proposalVersionId: 1,
						position: 0,
						value: 'Community Foundation',
						isValid: true,
						applicationFormFieldId: 1,
						applicationFormField: {
							id: 1,
							applicationFormId: 1,
							label: 'Organization Name',
							baseFieldId: 1,
							position: 0,
							createdAt: new Date(),
						},
						createdAt: new Date(),
					},
					{
						id: 1,
						proposalVersionId: 1,
						position: 0,
						value: 'Chicago',
						isValid: true,
						applicationFormFieldId: 1,
						applicationFormField: {
							id: 1,
							applicationFormId: 1,
							label: 'Organization Location',
							baseFieldId: 2,
							position: 1,
							createdAt: new Date(),
						},
						createdAt: new Date(),
					},
					{
						id: 1,
						proposalVersionId: 1,
						position: 0,
						value: 'John Doe',
						isValid: true,
						applicationFormFieldId: 1,
						applicationFormField: {
							id: 1,
							applicationFormId: 1,
							label: 'Submitter Name',
							baseFieldId: 1,
							position: 0,
							createdAt: new Date(),
						},
						createdAt: new Date(),
					},
					{
						id: 1,
						proposalVersionId: 1,
						position: 0,
						value: ' ',
						isValid: true,
						applicationFormFieldId: 1,
						applicationFormField: {
							id: 1,
							applicationFormId: 1,
							label: 'Label',
							baseFieldId: 4,
							position: 3,
							createdAt: new Date(),
						},
						createdAt: new Date(),
					},
				],
				createdAt: new Date(),
			},
		],
		createdAt: new Date(),
		createdBy: 1,
	},
];

const mappedProposals = mapProposals(baseFields, proposals);

test('maps the proposals', () => {
	expect(mappedProposals.length).toBe(proposals.length);
});

test('maps the proposal ID', () => {
	expect(mappedProposals[0]?.id).toBe(proposals[0]?.id.toString());
});

test('maps values to the expected place', () => {
	const targetBaseField = 'organization_name';

	const targetBaseFieldId = baseFields.find(
		(field) => field.shortCode === targetBaseField,
	)?.id;

	const proposalFieldValueIndex =
		proposals[0]?.versions[0]?.fieldValues.findIndex(
			(fieldValue) =>
				// Due to an issue with the @pdc-sdk package, the ApplicationFormField
				// type accomodates the 'any' type. This leads to an unsafe member
				// access error with eslint, hence the disable. See service issue #1004
				// https://github.com/PhilanthropyDataCommons/service/issues/1004
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				fieldValue.applicationFormField.baseFieldId === targetBaseFieldId,
		);

	expect(mappedProposals[0]?.values[targetBaseField]?.[0]).toEqual(
		proposals[0]?.versions[0]?.fieldValues[proposalFieldValueIndex ?? -1]
			?.value,
	);
});

test('does not map blank values', () => {
	expect(mappedProposals[0]?.values.organization_budget).toBeUndefined();
});
