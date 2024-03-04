import { ApiBaseField, ApiProposal } from './pdc-api';
import { mapProposals } from './map-proposals';

const baseFields: ApiBaseField[] = [
	{
		id: 1,
		label: 'Organization Name',
		shortCode: 'organization_name',
		description: 'Common name of the organization',
	},
	{
		id: 2,
		label: 'Organization City',
		shortCode: 'organization_city',
		description: 'City of the organization',
	},
	{
		id: 3,
		label: 'Organization Contact',
		shortCode: 'organization_contact',
		description: 'Person contact regarding this organization',
	},
	{
		id: 4,
		label: 'Organization Budget',
		shortCode: 'organization_budget',
		description: 'Annual budget of the organization',
	},
];

const apiProposals: ApiProposal[] = [
	{
		id: 1,
		versions: [
			{
				version: 1,
				fieldValues: [
					{
						value: 'Community Foundation',
						applicationFormField: {
							baseFieldId: 1,
							position: 0,
						},
					},
					{
						value: 'Chicago',
						applicationFormField: {
							baseFieldId: 2,
							position: 1,
						},
					},
					{
						value: 'John Doe',
						applicationFormField: {
							baseFieldId: 3,
							position: 2,
						},
					},
					{
						value: ' ', // Intentionally blank for testing
						applicationFormField: {
							baseFieldId: 4,
							position: 3,
						},
					},
				],
			},
		],
	},
];

const mappedProposals = mapProposals(baseFields, apiProposals);

test('maps the proposals', () => {
	expect(mappedProposals.length).toBe(apiProposals.length);
});

test('maps the proposal ID', () => {
	expect(mappedProposals[0]?.id).toBe(apiProposals[0]?.id.toString());
});

test('maps values to the expected place', () => {
	const targetBaseField = 'organization_name';

	const targetBaseFieldId = baseFields.find(
		(field) => field.shortCode === targetBaseField,
	)?.id;
	const proposalFieldValueIndex =
		apiProposals[0]?.versions[0]?.fieldValues.findIndex(
			(fieldValue) =>
				fieldValue.applicationFormField.baseFieldId === targetBaseFieldId,
		);

	expect(mappedProposals[0]?.values[targetBaseField]?.[0]).toEqual(
		apiProposals[0]?.versions[0]?.fieldValues[proposalFieldValueIndex ?? -1]
			?.value,
	);
});

test('does not map blank values', () => {
	expect(mappedProposals[0]?.values.organization_budget).toBeUndefined();
});
