import type { Meta, StoryObj } from '@storybook/react';

import { EmailLink } from '../components/EmailLink';

const meta = {
	component: EmailLink,
	tags: ['autodocs'],
} satisfies Meta<typeof EmailLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		to: 'example@example.org',
		children: 'Email me',
	},
};

export const NoChildren: Story = {
	args: {
		to: 'example@example.org',
	},
};

export const PrefilledSubjectAndBody: Story = {
	args: {
		to: 'example@example.org',
		children: 'Email me',
		subject: 'The subject is…',
		body: 'This should appear in the body',
	},
};
