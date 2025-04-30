import type { Meta, StoryObj } from '@storybook/react';

import { Spinner } from '../components/Spinner';

const meta = {
	component: Spinner,
	tags: ['autodocs'],
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
