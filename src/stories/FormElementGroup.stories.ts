import type { Meta, StoryObj } from '@storybook/vue3-vite';

import FormElementGroup from '../components/FormElementGroup.vue';
import CustomButton from '../components/CustomButton.vue';

const meta = {
	component: FormElementGroup,
	tags: ['autodocs'],
} satisfies Meta<typeof FormElementGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => ({
		components: { FormElementGroup, CustomButton },
		setup() {
			return { args };
		},
		template: `
			<div style="padding: 20px;">
				<FormElementGroup v-bind="args">
					<CustomButton>Button 1</CustomButton>
					<CustomButton>Button 2</CustomButton>
				</FormElementGroup>
			</div>
		`,
	}),
};

export const Vertical: Story = {
	render: (args) => ({
		components: { FormElementGroup, CustomButton },
		setup() {
			return { args };
		},
		template: `
			<div style="padding: 20px;">
				<FormElementGroup v-bind="args">
					<CustomButton>Button 1</CustomButton>
					<CustomButton>Button 2</CustomButton>
				</FormElementGroup>
			</div>
		`,
	}),
	args: {
		direction: 'vertical',
	},
};
