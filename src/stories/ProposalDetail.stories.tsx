import type { Meta, StoryObj } from '@storybook/react';

import { ProposalDetailPanel } from '../components/ProposalDetailPanel';

const meta = {
  component: ProposalDetailPanel,
  tags: ['autodocs'],
} satisfies Meta<typeof ProposalDetailPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    proposalId: 1,
    title: 'Proposal Title',
    applicant: 'Organization Name',
    applicantId: '12-3456789',
    version: 1,
    values: [
      {
        shortCode: 'proposal_date', fieldName: 'Proposal Date', position: 1, value: '2023-01-20',
      },
    ],
  },
};
