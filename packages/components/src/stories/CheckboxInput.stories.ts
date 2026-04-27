import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { CheckboxInput } from '../components/DataInputs';
import {
	PanelComponent,
	PanelHeader,
	PanelBody,
	PanelHeaderActionsWrapper,
	PanelHeaderAction,
	PanelSection,
} from '../components/Panel';

const meta = {
	component: CheckboxInput,
	tags: ['autodocs'],
} satisfies Meta<typeof CheckboxInput>;

export default meta;
const checkboxOptions = [
	{ label: 'Option 1', value: 'option1' },
	{ label: 'Option 2', value: 'option2' },
	{ label: 'Option 3', value: 'option3' },
];

const checkboxOptionsWithDescription = [
	{ label: 'Option 1', value: 'option1', description: 'Option 1 description' },
	{ label: 'Option 2', value: 'option2', description: 'Option 2 description' },
	{ label: 'Option 3', value: 'option3', description: 'Option 3 description' },
];

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => ({
		components: {
			CheckboxInput,
		},
		setup() {
			return { args, checkboxOptions };
		},
		template: `<CheckboxInput :options="checkboxOptions" />`,
	}),
};
export const WithDescription: Story = {
	render: (args) => ({
		components: {
			CheckboxInput,
		},
		setup() {
			return { args, checkboxOptionsWithDescription };
		},
		template: `<CheckboxInput :options="checkboxOptionsWithDescription" />`,
	}),
};
export const InPanel: Story = {
	render: (args) => ({
		components: {
			CheckboxInput,
			PanelComponent,
			PanelHeader,
			PanelBody,
			PanelHeaderActionsWrapper,
			PanelHeaderAction,
			PanelSection,
		},
		setup() {
			return { args, checkboxOptionsWithDescription };
		},
		template: `<PanelComponent padded>
		<PanelHeader>
			<h1>Upload Data</h1>
		</PanelHeader>
		<PanelBody variant="data-panel-padded">

			<PanelSection>
					<template #header>
					<h3>Checkbox Section Header</h3>
				</template>
				<template #content>
					<CheckboxInput :options="checkboxOptionsWithDescription" />
				</template>
			</PanelSection>

		</PanelBody>
	</PanelComponent>`,
	}),
};
