import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { NewBulkUploadPanel } from '../components/NewBulkUploadPanel';

const meta = {
  component: NewBulkUploadPanel,
  tags: ['autodocs'],
} satisfies Meta<typeof NewBulkUploadPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    apiUrl: new URL('http://localhost/'),
    bulkUploader: <code>bulkUploader</code>,
    baseFieldsLoader: <code>baseFieldsLoader</code>,
  },
};
