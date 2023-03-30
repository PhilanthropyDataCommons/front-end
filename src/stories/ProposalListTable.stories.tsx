import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { ProposalListTable } from '../components/ProposalListTable';

const meta = {
  component: ProposalListTable,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{
        width: '100%',
        maxHeight: '400px',
      }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProposalListTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    fieldNames: {
      organization_ein: 'Organization Tax ID',
      organization_name: 'Organization Name',
      organization_state: 'Organization State',
      proposal_date: 'Proposal Date',
      proposal_name: 'Proposal Name',
      proposal_budget: 'Proposal Budget',
      proposal_type: 'Proposal Type',
    },
    proposals: [
      {
        id: ['1'],
        organization_ein: ['12-3456789'],
        organization_name: ['Acme Corp'],
        organization_state: ['CA'],
        proposal_date: ['2022-05-01'],
        proposal_name: ['Make Things Better'],
        proposal_budget: ['$50,000'],
        proposal_type: ['Program Expenses'],
      },
      {
        id: ['2'],
        organization_ein: ['98-7654321'],
        organization_name: ['XYZ Inc.'],
        organization_state: ['NY'],
        proposal_date: ['2023-09-15'],
        proposal_name: ['Improve The World'],
        proposal_budget: ['$100,000'],
        proposal_type: ['Political Advocacy'],
      },
    ],
    columns: [
      'organization_ein',
      'organization_name',
      'organization_state',
      'proposal_date',
      'proposal_name',
      'proposal_budget',
      'proposal_type',
    ],
  },
};
