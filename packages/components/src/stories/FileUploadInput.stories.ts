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
	argTypes: {
		id: {
			control: 'text',
			description: 'Unique ID for the file input element',
		},
		accept: {
			control: 'text',
			description: 'File types to accept (e.g., ".csv", ".zip", "image/*")',
		},
	},
} satisfies Meta<typeof FileUploadInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		id: 'default-file-input',
	},
	render: (args) => ({
		components: {
			FileUploadInput,
		},
		setup() {
			return { args };
		},
		template: `
			<FileUploadInput
				:id="args.id"
				:accept="args.accept"
			/>
		`,
	}),
};

export const WithHeader: Story = {
	args: {
		id: 'header-file-input',
	},
	render: (args) => ({
		components: {
			FileUploadInput,
		},
		setup() {
			return { args };
		},
		template: `
			<FileUploadInput
				:id="args.id"
				:accept="args.accept"
			>
				<template #header>
					<h4>Choose Your File</h4>
				</template>
			</FileUploadInput>
		`,
	}),
};

export const WithInstructions: Story = {
	args: {
		id: 'instructions-file-input',
	},
	render: (args) => ({
		components: {
			FileUploadInput,
		},
		setup() {
			return { args };
		},
		template: `
			<FileUploadInput
				:id="args.id"
				:accept="args.accept"
			>
				<template #instructions>
					<p>Drag and drop a file or click to browse. Maximum file size: 10MB.</p>
				</template>
			</FileUploadInput>
		`,
	}),
};

export const WithHeaderAndInstructions: Story = {
	args: {
		id: 'full-file-input',
	},
	render: (args) => ({
		components: {
			FileUploadInput,
		},
		setup() {
			return { args };
		},
		template: `
			<FileUploadInput
				:id="args.id"
				:accept="args.accept"
			>
				<template #header>
					<h4>Upload Your Document</h4>
				</template>
				<template #instructions>
					<p>Drag and drop a file or click to browse. Accepted formats: PDF, DOCX, TXT.</p>
				</template>
			</FileUploadInput>
		`,
	}),
};

export const WithAcceptFilter: Story = {
	args: {
		id: 'csv-file-input',
		accept: '.csv',
	},
	render: (args) => ({
		components: {
			FileUploadInput,
		},
		setup() {
			return { args };
		},
		template: `
			<FileUploadInput
				:id="args.id"
				:accept="args.accept"
			>
				<template #header>
					<h4>Upload CSV File</h4>
				</template>
				<template #instructions>
					<p>Only CSV files are accepted.</p>
				</template>
			</FileUploadInput>
		`,
	}),
};

export const ZipFileUpload: Story = {
	args: {
		id: 'zip-file-input',
		accept: '.zip',
	},
	render: (args) => ({
		components: {
			FileUploadInput,
		},
		setup() {
			return { args };
		},
		template: `
			<FileUploadInput
				:id="args.id"
				:accept="args.accept"
			>
				<template #header>
					<h4>Upload ZIP Archive</h4>
				</template>
				<template #instructions>
					<p>Upload a ZIP file containing your attachments.</p>
				</template>
			</FileUploadInput>
		`,
	}),
};

export const InPanel: Story = {
	args: {
		id: 'panel-file-input',
	},
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
							<FileUploadInput
								:id="args.id"
								:accept="args.accept"
							>
								<template #header>
									<h4>Choose File</h4>
								</template>
								<template #instructions>
									<p>Select a CSV file to upload your data.</p>
								</template>
							</FileUploadInput>
						</template>
					</PanelSection>
				</PanelBody>
			</PanelComponent>
		`,
	}),
};

export const MultipleInputsInPanel: Story = {
	args: {
		id: 'multiple-inputs-example',
	},
	render: () => ({
		components: {
			FileUploadInput,
			PanelComponent,
			PanelHeader,
			PanelBody,
			PanelSection,
		},
		template: `
			<PanelComponent padded>
				<PanelHeader>
					<h1>Upload Multiple Files</h1>
				</PanelHeader>
				<PanelBody variant="data-panel-padded">
					<PanelSection>
						<template #header>
							<h3>Main Data File</h3>
						</template>
						<template #content>
							<FileUploadInput
								id="main-data-file"
								accept=".csv"
							>
								<template #header>
									<h4>Choose CSV File</h4>
								</template>
								<template #instructions>
									<p>Upload your main data CSV file.</p>
								</template>
							</FileUploadInput>
						</template>
					</PanelSection>
					<PanelSection>
						<template #header>
							<h3>Attachments Archive (Optional)</h3>
						</template>
						<template #content>
							<FileUploadInput
								id="attachments-archive-file"
								accept=".zip"
							>
								<template #header>
									<h4>Choose ZIP Archive</h4>
								</template>
								<template #instructions>
									<p>Upload a ZIP file containing attachments.</p>
								</template>
							</FileUploadInput>
						</template>
					</PanelSection>
				</PanelBody>
			</PanelComponent>
		`,
	}),
};
