import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { RadioInput } from '../components/DataInputs';
import {
	PanelComponent,
	PanelHeader,
	PanelBody,
	PanelHeaderActionsWrapper,
	PanelHeaderAction,
	PanelSection,
} from '../components/Panel';

const meta = {
	component: RadioInput,
	tags: ['autodocs'],
} satisfies Meta<typeof RadioInput>;

export default meta;
const radioOptions = [
	{ label: 'Option 1', value: 'option1' },
	{ label: 'Option 2', value: 'option2' },
	{ label: 'Option 3', value: 'option3' },
];

const radioOptionsWithDescription = [
	{ label: 'Option 1', value: 'option1', description: 'Option 1 description' },
	{ label: 'Option 2', value: 'option2', description: 'Option 2 description' },
	{ label: 'Option 3', value: 'option3', description: 'Option 3 description' },
];

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => ({
		components: {
			RadioInput,
		},
		setup() {
			return { args, radioOptions };
		},
		template: `<RadioInput :options="radioOptions" />`,
	}),
};
export const WithDescription: Story = {
	render: (args) => ({
		components: {
			RadioInput,
		},
		setup() {
			return { args, radioOptionsWithDescription };
		},
		template: `<RadioInput :options="radioOptionsWithDescription" />`,
	}),
};
export const InPanel: Story = {
	render: (args) => ({
		components: {
			RadioInput,
			PanelComponent,
			PanelHeader,
			PanelBody,
			PanelHeaderActionsWrapper,
			PanelHeaderAction,
			PanelSection,
		},
		setup() {
			return { args, radioOptionsWithDescription };
		},
		template: `<PanelComponent padded>
		<PanelHeader>
			<h1>Upload Data</h1>
		</PanelHeader>
		<PanelBody variant="data-panel-padded">

			<PanelSection>
					<template #header>
					<h3>Radio Section Header</h3>
				</template>
				<template #content>
					<RadioInput :options="radioOptionsWithDescription" />
				</template>
			</PanelSection>

		</PanelBody>
	</PanelComponent>`,
	}),
};
