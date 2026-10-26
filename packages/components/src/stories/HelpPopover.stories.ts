import type { Meta, StoryObj } from '@storybook/vue3-vite';

import HelpPopover from '../components/HelpPopover.vue';
import { RadioInput } from '../components/DataInputs';

const meta = {
	component: HelpPopover,
	tags: ['autodocs'],
	args: {
		label: 'About this field',
	},
} satisfies Meta<typeof HelpPopover>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => ({
		components: { HelpPopover },
		setup() {
			return { args };
		},
		template: `
			<div style="height: 200px">
				<HelpPopover v-bind="args">
					<p>Short, plain-language help for the field next to this icon.</p>
				</HelpPopover>
			</div>
		`,
	}),
};

export const InRadioInputHeader: Story = {
	args: {
		label: 'About grantee types',
	},
	render: (args) => ({
		components: { HelpPopover, RadioInput },
		setup() {
			return {
				args,
				options: [
					{ label: 'User', value: 'user' },
					{ label: 'Group', value: 'userGroup' },
					{ label: 'All authenticated users', value: 'authenticatedUsers' },
				],
			};
		},
		template: `
			<div style="height: 300px">
				<RadioInput name="grantee-type" :options="options">
					<template #header>Grantee type</template>
					<template #help>
						<HelpPopover v-bind="args">
							<p>The grantee type decides who receives this permission.</p>
						</HelpPopover>
					</template>
				</RadioInput>
			</div>
		`,
	}),
};
