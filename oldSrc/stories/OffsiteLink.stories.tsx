import type { Meta, StoryObj } from '@storybook/react';

import { OffsiteLink } from '../components/OffsiteLink';

const meta = {
	component: OffsiteLink,
	tags: ['autodocs'],
} satisfies Meta<typeof OffsiteLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		to: 'https://example.org',
		children: 'Example',
	},
};

export const NoChildren: Story = {
	args: {
		to: 'https://example.org',
	},
};

export const SameTab: Story = {
	args: {
		to: 'https://example.org',
		children: 'Example',
		targetBlank: false,
	},
};
