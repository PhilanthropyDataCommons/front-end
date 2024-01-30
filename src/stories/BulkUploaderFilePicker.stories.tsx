import type { Meta, StoryObj } from '@storybook/react';

import { BulkUploaderFilePicker } from '../components/BulkUploaderFilePicker';

const meta = {
  component: BulkUploaderFilePicker,
  tags: ['autodocs'],
} satisfies Meta<typeof BulkUploaderFilePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    uploadFile: async () => {},
  },
};
