import type { Meta, StoryObj } from '@storybook/vue3-vite';

import SpinnerComponent from '../components/SpinnerComponent.vue';

const meta = {
	component: SpinnerComponent,
	tags: ['autodocs'],
} satisfies Meta<typeof SpinnerComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => ({
		components: { SpinnerComponent },
		setup() {
			return { args };
		},
		template: `
			<div style="padding: 20px;">
				<SpinnerComponent v-bind="args" />
			</div>
		`,
	}),
};
