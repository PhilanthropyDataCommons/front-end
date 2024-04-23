import type { Meta, StoryObj } from '@storybook/react';

import { ToggleSwitch } from '../components/ToggleSwitch';

const meta = {
	component: ToggleSwitch,
	tags: ['autodocs'],
} satisfies Meta<typeof ToggleSwitch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: 'Toggle me',
	},
};

export const Checked: Story = {
	args: {
		children: 'Toggle me',
		checked: true,
	},
};
