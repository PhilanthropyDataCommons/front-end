import type { Meta, StoryObj } from '@storybook/react';

import { BulkUploadTask } from '@pdc/sdk';
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
			sourceKey: 'abc123',
			fileName: 'NormalFile.csv',
			fileSize: 10000000,
			status: BulkUploadTask.StatusEnum.Completed,
			createdAt: new Date().toISOString(),
			createdBy: '00000000-00000000-00000000-00000000',
			sourceId: 1,
		},
	},
};

export const Pending: Story = {
	args: {
		upload: {
			id: 123,
			sourceKey: 'abc123',
			fileName: 'WaitingToProcessFile.csv',
			fileSize: 100,
			status: BulkUploadTask.StatusEnum.Pending,
			createdAt: new Date().toISOString(),
			createdBy: '00000000-00000000-00000000-00000000',
			sourceId: 1,
		},
	},
};

export const InProgress: Story = {
	args: {
		upload: {
			id: 123,
			sourceKey: 'abc123',
			fileName: 'ProcessingFile.csv',
			fileSize: 1950,
			status: BulkUploadTask.StatusEnum.InProgress,
			createdAt: new Date().toISOString(),
			createdBy: '00000000-00000000-00000000-00000000',
			sourceId: 1,
		},
	},
};

export const Canceled: Story = {
	args: {
		upload: {
			id: 123,
			sourceKey: 'abc123',
			fileName: 'CanceledFile.csv',
			fileSize: 1000000,
			status: BulkUploadTask.StatusEnum.Canceled,
			createdAt: new Date().toISOString(),
			createdBy: '00000000-00000000-00000000-00000000',
			sourceId: 1,
		},
	},
};

export const Failed: Story = {
	args: {
		upload: {
			id: 123,
			sourceKey: 'abc123',
			fileName: 'BadFile.csv',
			fileSize: 1000000,
			status: BulkUploadTask.StatusEnum.Failed,
			createdAt: new Date().toISOString(),
			createdBy: '00000000-00000000-00000000-00000000',
			sourceId: 1,
		},
	},
};
