import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { SelectInput } from '../components/DataInputs';
import {
	PanelComponent,
	PanelHeader,
	PanelBody,
	PanelHeaderActionsWrapper,
	PanelHeaderAction,
	PanelSection,
} from '../components/Panel';

const meta = {
	component: SelectInput,
	tags: ['autodocs'],
} satisfies Meta<typeof SelectInput>;

export default meta;
const selectOptions = [
	{ label: 'Option 1', value: 'option1' },
	{ label: 'Option 2', value: 'option2' },
	{ label: 'Option 3', value: 'option3' },
];

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => ({
		components: {
			SelectInput,
		},
		setup() {
			return { args, selectOptions };
		},
		template: `<SelectInput :options="selectOptions" />`,
	}),
};
export const InPanel: Story = {
	render: (args) => ({
		components: {
			SelectInput,
			PanelComponent,
			PanelHeader,
			PanelBody,
			PanelHeaderActionsWrapper,
			PanelHeaderAction,
			PanelSection,
		},
		setup() {
			return { args, selectOptions };
		},
		template: `<PanelComponent padded>
		<PanelHeader>
			<h1>Upload Data</h1>
		</PanelHeader>
		<PanelBody variant="data-panel-padded">

			<PanelSection>
					<template #header>
					<h3>Select Section Header</h3>
				</template>
				<template #content>
					<SelectInput :options="selectOptions" />
				</template>
			</PanelSection>
		</PanelBody>
	</PanelComponent>`,
	}),
};
