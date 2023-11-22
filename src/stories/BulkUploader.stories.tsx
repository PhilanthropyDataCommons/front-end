import type { Meta, StoryObj } from '@storybook/react';

import { BulkUploader } from '../components/BulkUploader';

const meta = {
  component: BulkUploader,
  tags: ['autodocs'],
} satisfies Meta<typeof BulkUploader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    history: [], // todo
    loading: false,
  },
};

export const Loading: Story = {
  args: {
    history: [],
    loading: true,
  },
};
