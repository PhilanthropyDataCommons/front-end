import type { Meta, StoryObj } from '@storybook/react';

import { BaseFields } from '../components/BaseFields';

const meta = {
  component: BaseFields,
  tags: ['autodocs'],
} satisfies Meta<typeof BaseFields>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    fields: [
      { id: 1, label: 'Organization Name', shortCode: 'organization_name' },
      { id: 2, label: 'Proposal Summary', shortCode: 'proposal_summary' },
    ],
    loading: false,
  },
};

export const Loading: Story = {
  args: {
    fields: [],
    loading: true,
  },
};
