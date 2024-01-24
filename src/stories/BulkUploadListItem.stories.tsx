import type { Meta, StoryObj } from '@storybook/react';

import { BulkUploadListItem } from '../components/BulkUploadListItem';

const meta = {
  component: BulkUploadListItem,
  tags: ['autodocs'],
} satisfies Meta<typeof BulkUploadListItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    upload: {
      id: 123,
      fileName: 'NormalFile.csv',
      fileSize: 10000000,
      status: 'completed',
      createdAt: '2023-11-30T01:24:41',
    },
  },
};

export const Pending: Story = {
  args: {
    upload: {
      id: 123,
      fileName: 'WaitingToProcessFile.csv',
      fileSize: 100,
      status: 'pending',
      createdAt: '2023-11-30T01:24:41',
    },
  },
};

export const InProgress: Story = {
  args: {
    upload: {
      id: 123,
      fileName: 'ProcessingFile.csv',
      fileSize: 1950,
      status: 'in_progress',
      createdAt: '2023-11-30T01:24:41',
    },
  },
};

export const Canceled: Story = {
  args: {
    upload: {
      id: 123,
      fileName: 'CanceledFile.csv',
      fileSize: 1000000,
      status: 'canceled',
      createdAt: '2023-11-30T01:24:41',
    },
  },
};

export const Failed: Story = {
  args: {
    upload: {
      id: 123,
      fileName: 'BadFile.csv',
      fileSize: 1000000,
      status: 'failed',
      createdAt: '2023-11-30T01:24:41',
    },
  },
};
