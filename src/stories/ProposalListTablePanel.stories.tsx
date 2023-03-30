import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { ProposalListTablePanel } from '../components/ProposalListTablePanel';

const meta = {
  component: ProposalListTablePanel,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{
        width: '100%',
        height: '400px',
        position: 'relative',
      }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProposalListTablePanel>;

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
        proposal_date: ['2021-09-15'],
        proposal_name: ['Improve The World'],
        proposal_budget: ['$100,000'],
        proposal_type: ['Political Advocacy'],
      },
      {
        id: ['3'],
        organization_ein: ['23-4567891'],
        organization_name: ['Globex Corporation'],
        organization_state: ['TX'],
        proposal_date: ['2022-12-31'],
        proposal_name: ['Expand Our Reach'],
        proposal_budget: ['$75,000'],
        proposal_type: ['Capacity Building'],
      },
      {
        id: ['4'],
        organization_ein: ['12-3456789'],
        organization_name: ['Acme Corp'],
        organization_state: ['CA'],
        proposal_date: ['2022-07-15'],
        proposal_name: ['Upgrade Our Systems'],
        proposal_budget: ['$200,000'],
        proposal_type: ['Research and Development'],
      },
      {
        id: ['5'],
        organization_ein: ['11-2233445'],
        organization_name: ['Stark Industries'],
        organization_state: ['NY'],
        proposal_date: ['2022-01-01'],
        proposal_name: ['Save The Planet'],
        proposal_budget: ['$500,000'],
        proposal_type: ['Environmental Protection'],
      },
      {
        id: ['6'],
        organization_ein: ['98-7654321'],
        organization_name: ['XYZ Inc.'],
        organization_state: ['NY'],
        proposal_date: ['2023-03-15'],
        proposal_name: ['Empower The Youth'],
        proposal_budget: ['$80,000'],
        proposal_type: ['Capacity Building'],
      },
      {
        id: ['7'],
        organization_ein: ['34-5678901'],
        organization_name: ['Genco Pura Olive Oil Company'],
        organization_state: ['NJ'],
        proposal_date: ['2022-10-01'],
        proposal_name: ['Promote Healthy Living'],
        proposal_budget: ['$150,000'],
        proposal_type: ['Community Outreach'],
      },
      {
        id: ['8'],
        organization_ein: ['99-8765432'],
        organization_name: ['Wayne Enterprises'],
        organization_state: ['NJ'],
        proposal_date: ['2021-04-15'],
        proposal_name: ['Fight Crime'],
        proposal_budget: ['$250,000'],
        proposal_type: ['Law Enforcement'],
      },
      {
        id: ['9'],
        organization_ein: ['34-5678901'],
        organization_name: ['Genco Pura Olive Oil Company'],
        organization_state: ['NJ'],
        proposal_date: ['2022-01-01'],
        proposal_name: ['Reduce Carbon Footprint'],
        proposal_budget: ['$400,000'],
        proposal_type: ['Environmental Protection'],
      },
      {
        id: ['10'],
        organization_ein: ['23-4567891'],
        organization_name: ['Globex Corporation'],
        organization_state: ['TX'],
        proposal_date: ['2022-11-01'],
        proposal_name: ['Innovate and Grow'],
        proposal_budget: ['$300,000'],
        proposal_type: ['Research and Development'],
      },
    ],
  },
};
