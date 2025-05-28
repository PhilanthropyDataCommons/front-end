import type { Meta, StoryObj } from '@storybook/vue3-vite';

import { BaseField } from '@pdc/sdk';
import BaseFields from '../components/BaseFields.vue';

const meta = {
	component: BaseFields,
	tags: ['autodocs'],
} satisfies Meta<typeof BaseFields>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		fields: [
			{
				id: 1,
				label: 'Organization Name',
				shortCode: 'organization_name',
				description: 'Common name of the organization',
				dataType: BaseField.DataTypeEnum.String,
				createdAt: new Date().toISOString(),
				scope: BaseField.ScopeEnum.Proposal,
			},
			{
				id: 2,
				label: 'Proposal Summary',
				shortCode: 'proposal_summary',
				description: "Summary of the proposal's purpose",
				dataType: BaseField.DataTypeEnum.String,
				createdAt: new Date().toISOString(),
				scope: BaseField.ScopeEnum.Proposal,
			},
			{
				id: 3,
				label: 'Organization Contact',
				shortCode: 'organization_contact',
				description: 'Person contact regarding this organization',
				dataType: BaseField.DataTypeEnum.String,
				createdAt: new Date().toISOString(),
				scope: BaseField.ScopeEnum.Proposal,
			},
			{
				id: 4,
				label: 'Organization Budget',
				shortCode: 'organization_budget',
				description: 'Annual budget of the organization',
				dataType: BaseField.DataTypeEnum.String,
				createdAt: new Date().toISOString(),
				scope: BaseField.ScopeEnum.Proposal,
			},
		],
	},
};

export const Loading: Story = {
	args: {
		fields: [],
	},
};
