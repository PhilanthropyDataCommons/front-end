import { expect, test } from 'vitest';
import { Proposal, BaseField } from '@pdc/sdk';
import { mapProposals } from './map-proposals';

const baseFieldOrgName: BaseField = {
	id: 1,
	label: 'Organization Name',
	shortCode: 'organization_name',
	description: 'Common name of the organization',
	scope: BaseField.ScopeEnum.Proposal,
	dataType: BaseField.DataTypeEnum.String,
	createdAt: new Date().toISOString(),
};

const baseFieldOrgCity: BaseField = {
	id: 2,
	label: 'Organization City',
	shortCode: 'organization_city',
	description: 'City of the organization',
	scope: BaseField.ScopeEnum.Proposal,
	dataType: BaseField.DataTypeEnum.String,
	createdAt: new Date().toISOString(),
};

const baseFieldOrgContact: BaseField = {
	id: 3,
	label: 'Organization Contact',
	shortCode: 'organization_contact',
	description: 'Person contact regarding this organization',
	scope: BaseField.ScopeEnum.Proposal,
	dataType: BaseField.DataTypeEnum.String,
	createdAt: new Date().toISOString(),
};

const baseFieldOrgBudget: BaseField = {
	id: 4,
	label: 'Organization Budget',
	shortCode: 'organization_budget',
	description: 'Annual budget of the organization',
	scope: BaseField.ScopeEnum.Proposal,
	dataType: BaseField.DataTypeEnum.String,
	createdAt: new Date().toISOString(),
};

const baseFields: BaseField[] = [
	baseFieldOrgName,
	baseFieldOrgCity,
	baseFieldOrgContact,
	baseFieldOrgBudget,
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
							createdAt: new Date().toISOString(),
							baseField: baseFieldOrgName,
						},
						createdAt: new Date().toISOString(),
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
							createdAt: new Date().toISOString(),
							baseField: baseFieldOrgCity,
						},
						createdAt: new Date().toISOString(),
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
							createdAt: new Date().toISOString(),
							baseField: baseFieldOrgContact,
						},
						createdAt: new Date().toISOString(),
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
							createdAt: new Date().toISOString(),
							baseField: baseFieldOrgBudget,
						},
						createdAt: new Date().toISOString(),
					},
				],
				sourceId: 1,
				createdAt: new Date().toISOString(),
			},
		],
		createdAt: new Date().toISOString(),
		createdBy: '1',
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
