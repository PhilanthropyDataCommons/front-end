import type { Meta, StoryObj } from '@storybook/vue3-vite';

import ToggleSwitch from '../components/ToggleSwitch.vue';

const meta = {
	component: ToggleSwitch,
	tags: ['autodocs'],
} satisfies Meta<typeof ToggleSwitch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => ({
		components: { ToggleSwitch },
		setup() {
			return { args };
		},
		template: `
			<div style="padding: 20px;">
				<ToggleSwitch v-bind="args">
					Toggle me
				</ToggleSwitch>
			</div>
		`,
	}),
};

export const Checked: Story = {
	render: (args) => ({
		components: { ToggleSwitch },
		setup() {
			return { args };
		},
		template: `
			<div style="padding: 20px;">
				<ToggleSwitch v-bind="args">
					Toggle me
				</ToggleSwitch>
			</div>
		`,
	}),
	args: {
		checked: true,
	},
};
