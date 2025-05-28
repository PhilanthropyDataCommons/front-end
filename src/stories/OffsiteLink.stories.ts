import type { Meta, StoryObj } from '@storybook/vue3-vite';

import OffSiteLink from '../components/OffSiteLink.vue';

const meta = {
	component: OffSiteLink,
	tags: ['autodocs'],
} satisfies Meta<typeof OffSiteLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => ({
		components: { OffSiteLink },
		setup() {
			return { args };
		},
		template: `
			<div style="padding: 20px;">
				<OffSiteLink v-bind="args">
					Example
				</OffSiteLink>
			</div>
		`,
	}),
	args: {
		to: 'https://example.org',
	},
};

export const NoChildren: Story = {
	render: (args) => ({
		components: { OffSiteLink },
		setup() {
			return { args };
		},
		template: `
			<div style="padding: 20px;">
				<OffSiteLink v-bind="args" />
			</div>
		`,
	}),
	args: {
		to: 'https://example.org',
	},
};

export const SameTab: Story = {
	render: (args) => ({
		components: { OffSiteLink },
		setup() {
			return { args };
		},
		template: `
			<div style="padding: 20px;">
				<OffSiteLink v-bind="args">
					Example
				</OffSiteLink>
			</div>
		`,
	}),
	args: {
		to: 'https://example.org',
		targetBlank: false,
	},
};
