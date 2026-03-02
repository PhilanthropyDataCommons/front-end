<script setup lang="ts">
import type { ApplicationForm, ApplicationFormBundle, Opportunity, OpportunityBundle, SourceBundle } from '@pdc/sdk';
import {
	PanelComponent,
	PanelBody,
	PanelHeader,
	PanelHeaderActionsWrapper,
	PanelSection,
	FileUploadInput,
	DataSubmitButton,
	SelectInput,
	ErrorMessage,
	PanelHeaderAction,
} from '@pdc/components';
import { getLogger } from '@pdc/utilities';
import { DocumentPlusIcon } from '@heroicons/vue/24/outline';
import { ref } from 'vue';
import { downloadApplicationFormCsv } from '../pdc-api';

const props = defineProps<{
	bulkUpload: File | null;
	attachmentsUpload: File | null;
	sourceId: string | null;
	applicationFormId: string | null;
	sources: SourceBundle | null;
	applicationForms: ApplicationFormBundle | null;
	opportunities: OpportunityBundle | null;
	handleBulkUpload: (file: File, attachmentsFile: File | null) => Promise<void>;
}>();

const emit = defineEmits<{
	'update:bulk-upload': [file: File | null];
	'update:attachments-upload': [file: File | null];
	'update:source-id': [sourceId: string | null];
	'update:application-form-id': [applicationFormId: string | null];
}>();

const logger = getLogger('BulkUploader');
const hadError = ref(false);
const errorMessage = ref('');

const hadCsvError = ref(false);
const csvErrorMessage = ref('');

const handleCsvDownload = async (): Promise<void> => {
	if (props.applicationFormId === null) {
		return;
	}
	try {
		await downloadApplicationFormCsv(Number(props.applicationFormId));
		hadCsvError.value = false;
	} catch (error) {
		logger.error({ error }, 'Failed to download CSV template');
		csvErrorMessage.value =
			error instanceof Error ? error.message : 'Failed to Load CSV Template';
		hadCsvError.value = true;
	}
}
const applicationFormLabel = (form: ApplicationForm, opportunities: Opportunity[]): string => {
	const name = form.name ?? `Application Form #${form.id}`;
	const opportunity = opportunities.find((o) => o.id === form.opportunityId);
	return opportunity !== undefined ? `${name} (${opportunity.title})` : name;
};

const applicationFormLabel = (
	form: ApplicationForm,
	opportunities: Opportunity[],
): string => {
	const opportunity = opportunities.find(({ id }) => id === form.opportunityId);
	// The SDK types name and title as `string`, but they can be null at runtime.
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	const formName = form.name ?? null;
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	const opportunityTitle = opportunity?.title ?? null;

	if (formName !== null && opportunityTitle !== null) {
		return `${formName} (${opportunityTitle})`;
	}
	if (formName !== null) {
		return formName;
	}
	return `Application Form #${form.id}`;
};

const handleFormSubmit = async (event: Event): Promise<void> => {
	event.preventDefault();

	if (props.bulkUpload === null) {
		logger.warn('Attempted to submit form without a file');
		return;
	}

	try {
		await props.handleBulkUpload(props.bulkUpload, props.attachmentsUpload);
		logger.info('Bulk upload submitted successfully');
	} catch (error) {
		logger.error({ error }, 'Failed to submit bulk upload');
		errorMessage.value =
			error instanceof Error
				? error.message
				: 'An error occurred while submitting the bulk upload.';
		hadError.value = true;
	}
};
</script>

<template>
	<PanelComponent padded>
		<PanelHeader>
			<h1>New Bulk Upload</h1>
			<PanelHeaderActionsWrapper>
				<PanelHeaderAction>
					<BackButton to="/bulk-uploads" label="Back to bulk uploads" />
				</PanelHeaderAction>
			</PanelHeaderActionsWrapper>
		</PanelHeader>
		<PanelBody variant="data-panel-padded">
			<form @submit="handleFormSubmit">
				<PanelSection>
					<template #header>
						<h3>Associated Entities</h3>
					</template>
					<template #content>
						<SelectInput
							:model-value="props.applicationFormId"
							:options="
								props.applicationForms?.entries.map((form) => ({
									label: applicationFormLabel(form, props.opportunities?.entries ?? []),
									value: form.id.toString(),
								}))
							"
							@update:model-value="
								(value: string | null | undefined) =>
									emit('update:application-form-id', value ?? null)
							"
						>
							<template #header>Application Form</template>
							<template #instructions>
								Select the application form associated with this bulk upload.
							</template>
						</SelectInput>
						<SelectInput
							:model-value="props.sourceId"
							:options="
								props.sources?.entries.map((source) => ({
									label: source.label,
									value: source.id.toString(),
								}))
							"
							@update:model-value="
								(value: string | null | undefined) =>
									emit('update:source-id', value ?? null)
							"
						>
							<template #header>Source</template>
							<template #instructions>
								If blank, the default source in the pdc instance will be used
								for the bulk upload.
							</template>
						</SelectInput>
					</template>
				</PanelSection>
				<PanelSection>
					<template #header>
						<h3>Upload CSV File</h3>
						<div class="csv-download-wrapper">
							<div class="csv-download-top">
								<DocumentPlusIcon class="icon" />
								<button
									:disabled="props.applicationFormId === null"
									class="download-csv-text"
									@click.prevent="handleCsvDownload"
								>
									Download CSV template
								</button>
							</div>
							<p v-if="props.applicationFormId === null" class="csv-hint">
								Select an application form to download its CSV template.
							</p>
							<ErrorMessage v-if="hadCsvError" :message="csvErrorMessage" />
						</div>
					</template>
					<template #content>
						<FileUploadInput
							id="bulk-upload-file-input"
							accept=".csv"
							:model-value="props.bulkUpload"
							@update:model-value="
								(value: File | null | undefined) =>
									emit('update:bulk-upload', value ?? null)
							"
						>
							<template #header>Choose File</template>
							<template #instructions>
								A bulk-upload CSV must have a valid email address in the
								proposal_submitter_email address column.
							</template>
						</FileUploadInput>
					</template>
				</PanelSection>
				<PanelSection>
					<template #header>
						<h3>Base Field File Attachments (Optional)</h3>
						<p class="text-color-gray-medium-dark">
							A zip file containing the file attachments for basefields.
						</p>
					</template>
					<template #content>
						<FileUploadInput
							id="attachments-file-input"
							accept=".zip"
							:model-value="props.attachmentsUpload"
							@update:model-value="
								(value: File | null | undefined) =>
									emit('update:attachments-upload', value ?? null)
							"
						>
							<template #header>Choose Attachments File</template>
							<template #instructions>
								The bulk upload CSV file must refer to the files by their
								relative path from the root of the zip file.
							</template>
						</FileUploadInput>
					</template>
				</PanelSection>
				<PanelSection>
					<template #header>
						<div v-if="props.bulkUpload">
							<h3>Ready to upload</h3>
							<p class="text-color-gray-medium-dark">
								All required data has been provided.
							</p>
						</div>
					</template>
					<template #content>
						<ErrorMessage v-if="hadError" :message="errorMessage" />
						<DataSubmitButton :disabled="props.bulkUpload === null">
							Submit
						</DataSubmitButton>
					</template>
				</PanelSection>
			</form>
		</PanelBody>
	</PanelComponent>
</template>

<style scoped>
.error-message {
	color: var(--color--red--dark);
	display: flex;
	align-items: center;
}

.download-csv-text {
	background: none;
	border: none;
	padding: 0;
	font: inherit;
	color: var(--color--blue);
	text-decoration: underline;
	cursor: pointer;
}

.download-csv-text:disabled {
	color: var(--color--gray--medium-dark);
	cursor: not-allowed;
}

.csv-download-top {
	display: flex;
	align-items: center;
	gap: var(--fixed-spacing--1x);
}

.csv-hint {
	margin: var(--fixed-spacing--1x) 0 0;
	font-size: 0.75rem;
	color: var(--color--gray--medium-dark);
	white-space: nowrap;
}
</style>
