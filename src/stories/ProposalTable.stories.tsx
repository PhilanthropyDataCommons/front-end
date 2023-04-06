import type { Meta, StoryObj } from '@storybook/react';

import { ProposalTable } from '../components/ProposalTable';

const meta = {
  component: ProposalTable,
  tags: ['autodocs'],
} satisfies Meta<typeof ProposalTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    version: 1,
    values: [
      { fieldName: 'Proposal Date', position: 1, value: '2023-01-20' },
    ],
  },
};
