import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import { getLogger } from '@pdc/utilities';
import { DataSubmitButton, RadioInput } from '../components/DataInputs';
import {
	PanelComponent,
	PanelHeader,
	PanelBody,
	PanelHeaderActionsWrapper,
	PanelHeaderAction,
	PanelSection,
} from '../components/Panel';

const meta = {
	component: DataSubmitButton,
	tags: ['autodocs'],
} satisfies Meta<typeof DataSubmitButton>;

export default meta;

const dataSubmitButtonProps = {
	disabled: false,
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: dataSubmitButtonProps,
	render: (args) => ({
		components: {
			DataSubmitButton,
		},
		setup() {
			return { args };
		},
		template: `<DataSubmitButton>
			Submit
		</DataSubmitButton>`,
	}),
};
export const Disabled: Story = {
	args: dataSubmitButtonProps,
	render: (args) => ({
		components: {
			DataSubmitButton,
		},
		setup() {
			return { args };
		},
		template: `<DataSubmitButton :disabled="true">
			Submit
		</DataSubmitButton>`,
	}),
};
export const WithRadioInput: Story = {
	args: dataSubmitButtonProps,
	render: (args) => ({
		components: {
			DataSubmitButton,
			RadioInput,
		},
		setup() {
			const logger = getLogger('DataSubmitButton.stories');
			const formData = ref({
				preference: '',
			});
			const radioOptions = [
				{ label: 'Option A', value: 'option-a' },
				{ label: 'Option B', value: 'option-b' },
				{ label: 'Option C', value: 'option-c' },
			];
			const handleSubmit = (event: Event): void => {
				event.preventDefault();
				logger.info(`Form submitted with: ${JSON.stringify(formData.value)}`);
			};
			return { args, formData, radioOptions, handleSubmit };
		},
		template: `
		<form @submit="handleSubmit">
			<div>
				<RadioInput
					:options="radioOptions"
					v-model="formData.preference"
				/>
			</div>
			<DataSubmitButton :disabled="args.disabled">
				Submit Selection
			</DataSubmitButton>
		</form>`,
	}),
};

export const InPanel: Story = {
	args: dataSubmitButtonProps,
	render: (args) => ({
		components: {
			DataSubmitButton,
			RadioInput,
			PanelComponent,
			PanelHeader,
			PanelBody,
			PanelHeaderActionsWrapper,
			PanelHeaderAction,
			PanelSection,
		},
		setup() {
			const logger = getLogger('DataSubmitButton.stories');
			const formData = ref({
				preference: '',
			});
			const radioOptions = [
				{
					label: 'High Priority',
					value: 'high',
					description: 'Urgent items requiring immediate attention',
				},
				{
					label: 'Medium Priority',
					value: 'medium',
					description: 'Important items with moderate urgency',
				},
				{
					label: 'Low Priority',
					value: 'low',
					description: 'Items that can be addressed later',
				},
			];
			const handleSubmit = (event: Event): void => {
				event.preventDefault();
				logger.info(
					`Panel form submitted with: ${JSON.stringify(formData.value)}`,
				);
			};
			return { args, formData, radioOptions, handleSubmit };
		},
		template: `
		<PanelComponent padded>
			<PanelHeader>
				<h1>Priority Selection</h1>
			</PanelHeader>
			<PanelBody variant="data-panel-padded">
				<form @submit="handleSubmit">
					<PanelSection>
						<template #header>
							<h3>Select Priority Level</h3>
						</template>
						<template #content>
							<RadioInput
								:options="radioOptions"
								v-model="formData.preference"
							/>
						</template>
					</PanelSection>
					<PanelSection>
						<template #header>
							<h3>Submit Selection</h3>
						</template>
						<template #content>
							<DataSubmitButton :disabled="args.disabled">
								Submit
							</DataSubmitButton>
						</template>
					</PanelSection>
				</form>
			</PanelBody>
		</PanelComponent>`,
	}),
};
