import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { FileUploadInput } from '../components/DataInputs';
import {
	PanelComponent,
	PanelHeader,
	PanelBody,
	PanelSection,
} from '../components/Panel';

const meta = {
	component: FileUploadInput,
	tags: ['autodocs'],
} satisfies Meta<typeof FileUploadInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => ({
		components: {
			FileUploadInput,
		},
		setup() {
			return { args };
		},
		template: `
					<FileUploadInput/>
				`,
	}),
};

export const WithHeader: Story = {
	render: (args) => ({
		components: {
			FileUploadInput,
		},
		setup() {
			return { args };
		},
		template: `
					<FileUploadInput>
    <template #file-upload-header>
        <h4>File Upload Header</h4>
    </template>

					</FileUploadInput>
				`,
	}),
};

export const WithInstructions: Story = {
	render: (args) => ({
		components: {
			FileUploadInput,
		},
		setup() {
			return { args };
		},
		template: `
					<FileUploadInput>

    <template #file-upload-instructions>
        <p>File Upload Instructions</p>
    </template>

					</FileUploadInput>
				`,
	}),
};

export const WithHeaderAndInstructions: Story = {
	render: (args) => ({
		components: {
			FileUploadInput,
		},
		setup() {
			return { args };
		},
		template: `
					<FileUploadInput>
    <template #file-upload-header>
        <h4>File Upload Header</h4>
    </template>
    <template #file-upload-instructions>
        <p>File Upload Instructions</p>
    </template>
					</FileUploadInput>
				`,
	}),
};

export const InPanel: Story = {
	render: (args) => ({
		components: {
			FileUploadInput,
			PanelComponent,
			PanelHeader,
			PanelBody,
			PanelSection,
		},
		setup() {
			return { args };
		},
		template: `
		<PanelComponent padded>
		<PanelHeader>
			<h1>Upload Data</h1>
		</PanelHeader>
		<PanelBody variant="data-panel-padded">
			<PanelSection>
				<template #header>
					<h3>File Upload Section Header</h3>
				</template>
				<template #content>
					<FileUploadInput>
						<template #file-upload-header>
							<h4>File Upload Header</h3>
						</template>
						<template #file-upload-instructions>
							<p>File Upload Instructions</p>
						</template>
					</FileUploadInput>
				</template>
			</PanelSection>
		</PanelBody>
	</PanelComponent>
				`,
	}),
};
